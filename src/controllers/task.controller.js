import httpStatus from 'http-status';

import {
  createTask,
  destroyTask,
  findTaskById,
  findTasksPage,
  updateTask,
} from '../services/task.service.js';
import { catchAsync } from '../utils/catchAsync.js';

export const postTask = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const task = await createTask({ ...req.body, userId });

  return res.status(httpStatus.CREATED).send(task);
});

export const getTaskById = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  const task = await findTaskById(id, { userId });

  return res.status(httpStatus.OK).send(task);
});

export const putTask = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  const task = await updateTask(id, { ...req.body, userId });
  return res.status(httpStatus.OK).send(task);
});

export const deleteTask = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  await destroyTask(id, { userId });
  return res.status(httpStatus.NO_CONTENT).send();
});

export const getTasksPage = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { status, page, limit } = req.query;

  const result = await findTasksPage({ status, page, limit, userId });

  return res.status(httpStatus.OK).send(result);
});
