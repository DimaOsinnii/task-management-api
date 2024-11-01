import { DataTypes } from 'sequelize';
import db from '../db.js';
import { TASK_STATUS } from '../constants.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The primary key of the task.
 *         title:
 *           type: string
 *           description: The title of the task.
 *           example: "Finish project report"
 *         description:
 *           type: string
 *           description: A detailed description of the task.
 *           example: "Complete the final report for the project"
 *         status:
 *           type: string
 *           enum:
 *             - DONE
 *             - TODO
 *             - IN_PROGRESS
 *           description: The status of the task.
 *           example: "TODO"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the task was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the task was last updated.
 */
const Task = db.define(
  'task',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(TASK_STATUS.DONE, TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS),
      defaultValue: TASK_STATUS.TODO,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Task;
