import express from 'express';
import httpStatus from 'http-status';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use((req, res, next) => {
  return res.status(httpStatus.NOT_IMPLEMENTED).send({
    error: httpStatus[httpStatus.NOT_IMPLEMENTED],
  });
});

export default app;

// app.use(errorHandler);
