import { DataTypes } from 'sequelize';
import db from '../db.js';

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

export default User;
