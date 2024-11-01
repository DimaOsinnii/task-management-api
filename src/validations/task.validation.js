import * as yup from 'yup';
import { TASK_STATUS } from '../constants.js';

/**
 * @swagger
 * components:
 *   validations:
 *     PostTaskBodyParams:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the task
 *         description:
 *           type: string
 *           description: Description of the task
 */
export const postTaskValidation = yup.object({
  body: yup.object({
    title: yup.string().required('Title is required').min(1),
    description: yup.string().nullable(),
  }),
});

/**
 * @swagger
 * components:
 *   validations:
 *     PutTaskBodyParams:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the task
 *         description:
 *           type: string
 *           description: Description of the task
 *         status:
 *           type: string
 *           enum: [done, todo, in-progress]
 *           description: Status of the task
 */
export const putTaskValidation = yup.object({
  params: yup.object({
    id: yup.number().integer().required(),
  }),
  body: yup.object({
    title: yup.string().min(1),
    description: yup.string().nullable(),
    status: yup.string().oneOf([TASK_STATUS.DONE, TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS]),
  }),
});

export const taskIdValidation = yup.object({
  params: yup.object({
    id: yup.number().integer().required('Task ID is required'),
  }),
});

export const getTasksPageValidation = yup.object({
  query: yup.object({
    status: yup.string().oneOf([TASK_STATUS.DONE, TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS]),
    page: yup.number().integer().min(1).default(1),
    limit: yup.number().integer().min(1).default(10),
  }),
});
