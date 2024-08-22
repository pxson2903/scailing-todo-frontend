import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(32).required(),
});

export const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(32).required(),
  passwordConfirm: yup
    .string()
    .required('Please retype your password.')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

export const updateTaskSchema = yup.object().shape({
  id: yup.number(),
  title: yup.string().required(),
  description: yup.string(),
  completed: yup.boolean(),
});
