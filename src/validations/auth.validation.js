import * as yup from 'yup';
import { emailValidation } from './common/emailValidation.js';
import { passwordValidation } from './common/passwordValidation.js';

//TODO: remove this validation if any other fields won't be added
/**
 * @swagger
 * components:
 *   validations:
 *     PostRegisterBodyParams:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 */
export const postRegisterValidation = yup.object({
  body: yup.object({
    email: emailValidation.required('Email is required'),
    password: passwordValidation.required('Password is required'),
  }),
});

/**
 * @swagger
 * components:
 *   validations:
 *     PostLoginBodyParams:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 */
export const postLoginValidation = yup.object({
  body: yup.object({
    email: emailValidation.required('Email is required'),
    password: passwordValidation.required('Password is required'),
  }),
});
