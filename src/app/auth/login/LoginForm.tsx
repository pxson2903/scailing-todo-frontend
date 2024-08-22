'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { FormInputText } from '@/components/common/FormInput';
import { loginSchema } from '@/utils';
import { useLoginMutation } from '@/api/services/auth';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/slices/authSlice';

interface IFormInput {
  email: string;
  password: string;
}

const defaultValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const methods = useForm<IFormInput>({
    defaultValues: defaultValues,
    resolver: yupResolver(loginSchema),
  });
  const { handleSubmit, control } = methods;

  const onSubmit = async (data: IFormInput) => {
    const result = await login({
      email: data.email,
      password: data.password,
    }).unwrap();
    if (result) {
      dispatch(setAuth({ user: result.user, token: result.token }));
      router.replace('/');
    }
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} mt={3}>
              <Typography variant="h4">Login</Typography>
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
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Grid item>
                <Link href="/auth/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
};

export default LoginForm;
