import express from 'express';
import httpStatus from 'http-status';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import router from './router.js';
import errorHandler from './middlewares/error.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use('/', router);

app.use((req, res, next) => {
  return res.status(httpStatus.NOT_IMPLEMENTED).send({
    error: httpStatus[httpStatus.NOT_IMPLEMENTED],
  });
});

app.use(errorHandler);

export default app;
