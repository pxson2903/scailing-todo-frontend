import { Metadata, NextPage } from 'next';
import LoginForm from './LoginForm';

const LoginPage: NextPage = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export const metadata: Metadata = {
  title: 'Login - Task Management',
  description: 'Task Management',
};

export default LoginPage;
