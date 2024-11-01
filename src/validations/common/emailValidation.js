import * as yup from 'yup';

export const emailValidation = yup
  .string()
  .matches(
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    'Please enter a valid email address'
  );
