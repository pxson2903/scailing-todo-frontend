'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { FormInputText } from '@/components/common/FormInput';
import { registerSchema } from '@/utils';
import { useRegisterMutation } from '@/api/services';
import displaySuccessMessage from '@/utils/displaySuccessMessage';

interface IFormInput {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}

const defaultValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  firstName: '',
  lastName: '',
};

const RegisterForm = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  const methods = useForm<IFormInput>({
    defaultValues: defaultValues,
    resolver: yupResolver(registerSchema),
  });
  const { handleSubmit, control } = methods;
  const onSubmit = async (formInput: IFormInput) => {
    const result = await register({
      email: formInput.email,
      password: formInput.password,
      password_confirm: formInput.passwordConfirm,
      first_name: formInput.firstName,
      last_name: formInput.lastName,
    }).unwrap();
    if (result) {
      displaySuccessMessage(
        'Register account succesfully. Redirecting to login page'
      );
      router.replace('/auth/login');
    }
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} mt={3}>
              <Typography variant="h4">Register an account</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                name={'firstName'}
                control={control}
                label={'First name'}
              />{' '}
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                name={'lastName'}
                control={control}
                label={'Last name'}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText name={'email'} control={control} label={'Email'} />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                name={'password'}
                control={control}
                label={'Password'}
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                name={'passwordConfirm'}
                control={control}
                label={'Confirm your password'}
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  {'Back to login'}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
};

export default RegisterForm;
