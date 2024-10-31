import app from './app.js';
import config from './config.js';
import db from './db.js';

let server;
// Sequelize sync only for dev purposes
db.authenticate()
  .then(() => db.sync({ alter: true }))
  .then(() => {
    server = app.listen(config.server.port, () => {
      //Temporary logger
      console.log(`Listening to port ${config.server.port}`);
    });
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  exitHandler();
});
