import httpStatus from 'http-status';
import { BaseError as SequelizeError } from 'sequelize';
import { ApplicationError } from '../utils/error.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err);

  let status;
  let message;

  if (err instanceof SequelizeError) {
    status = httpStatus.UNPROCESSABLE_ENTITY;
  } else if (err instanceof ApplicationError) {
    status = err.statusCode;
    message = err.message;
  } else {
    status = httpStatus.INTERNAL_SERVER_ERROR;
  }

  return res.status(status).send({
    error: httpStatus[status],
    message,
  });
};

export default errorHandler;
