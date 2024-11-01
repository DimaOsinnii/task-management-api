import { Sequelize } from 'sequelize';

import config from './config.js';

const db = new Sequelize(config.db.url, { dialect: 'postgres', logging: false });

export default db;
