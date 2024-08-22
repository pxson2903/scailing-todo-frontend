import { Metadata, NextPage } from 'next';
import RegisterForm from './RegisterForm';

export const metadata: Metadata = {
  title: 'Signup - Task Management',
  description: 'Task Management',
};

const RegisterPage: NextPage = () => {
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
