import * as yup from 'yup';
import { emailValidation } from './common/emailValidation.js';
import { passwordValidation } from './common/passwordValidation.js';

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
    firstName: yup.string().min(1),
    lastName: yup.string().min(1),
    email: emailValidation.required(),
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
