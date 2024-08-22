'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Card, CardContent, Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useParams, useRouter } from 'next/navigation';
import { FormInputText } from '@/components/common/FormInput';
import { updateTaskSchema } from '@/utils';
import {
  useLazyGetTaskDetailQuery,
  useUpdateTaskMutation,
} from '@/api/services';
import displaySuccessMessage from '@/utils/displaySuccessMessage';
import { useEffect } from 'react';
import withPageRequiredAuth from '@/hoc/with-page-required-auth';
import FormInputSwitch from '@/components/common/FormInput/FormInputSwitch';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';

interface IFormInput {
  id?: number;
  title: string;
  description?: string;
  completed?: boolean;
}

const defaultValues = {
  title: '',
};

const TaskForm = () => {
  const params = useParams();
  const router = useRouter();
  const { location } = useCurrentLocation();
  const taskId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [getTaskDetail, { data: taskDetail, isError }] =
    useLazyGetTaskDetailQuery();
  const [updateTask] = useUpdateTaskMutation();

  const methods = useForm<IFormInput>({
    defaultValues: defaultValues,
    resolver: yupResolver(updateTaskSchema),
  });
  const { handleSubmit, control, setValue } = methods;

  useEffect(() => {
    getTaskDetail({ id: Number(taskId) });
  }, []);

  useEffect(() => {
    if (taskDetail) {
      setValue('title', taskDetail.title || '');
      setValue('description', taskDetail.description || '');
      setValue('completed', !!taskDetail.completed);
    }
  }, [taskDetail, setValue]);

  const onSubmit = async (data: IFormInput) => {
    const result = await updateTask({
      id: Number(taskId),
      title: data.title,
      description: data.description,
      completed: data.completed ?? false,
      lat: location?.lat || 0,
      lon: location?.lon || 0,
      apiType: 'weatherstack',
    }).unwrap();
    if (result) {
      displaySuccessMessage('Update task successfully');

      getTaskDetail({ id: Number(taskId) });
    }
  };

  useEffect(() => {
    if (isError) {
      router.push('/');
    }
  }, [isError]);

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} mt={3}>
              <Typography variant="h4">Task detail</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormInputText name={'title'} control={control} label={'Title'} />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                name={'description'}
                control={control}
                label={'Description'}
                multiline={true}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputSwitch
                name={'completed'}
                control={control}
                label={'Mark as completed'}
              />
            </Grid>

            {taskDetail && taskDetail.temperature && (
              <Grid item xs={12} mt={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Weather Information
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>City:</strong> {taskDetail.city}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Temperature:</strong> {taskDetail.temperature}°C
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Description:</strong>{' '}
                      {taskDetail.weatherDescription}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Humidity:</strong> {taskDetail.humidity}%
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Wind Speed:</strong> {taskDetail.windSpeed} m/s
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
};

export default withPageRequiredAuth(TaskForm);
