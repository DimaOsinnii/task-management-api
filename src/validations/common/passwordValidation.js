import * as yup from 'yup';

export const passwordValidation = yup
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(128, 'Password must be no more than 128 characters long')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(
    /[\^$*.[\]{}()?\-"!@#%&/,><':;|_~`]/,
    'Password must contain at least one special character'
  );
