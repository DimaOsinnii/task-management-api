import { DataTypes } from 'sequelize';
import db from '../db.js';
import { TASK_STATUS } from '../constants.js';

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
