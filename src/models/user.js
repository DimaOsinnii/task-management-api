import { DataTypes } from 'sequelize';
import db from '../db.js';
import Task from './task.js';

/**
 * @swagger
 * components:
 *   models:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The primary key of the user.
 *         email:
 *           type: string
 *           description: Email of the user
 *         createdAt:
 *           type: date-time
 *           description: Created time
 */
const User = db.define('user', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
});

Task.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export default User;
