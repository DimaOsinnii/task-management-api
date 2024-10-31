import { Sequelize } from 'sequelize';

import config from './config.js';

const dbConfig = {
  dialect: 'postgres',
};

const db = new Sequelize(config.db.url, dbConfig);

export default db;
