import Task from '../models/task.js';
import { ApplicationError } from '../utils/error.js';

export async function createTask({ title, description, userId }) {
  return Task.create({ title, description, userId });
}

export async function updateTask(id, { title, description, status, userId }) {
  const task = await findTaskById(id, { userId });

  await task.update({ title, description, status });
  return task;
}

export async function destroyTask(id, { userId }) {
  const task = await findTaskById(id, { userId });

  return task.destroy();
}

export async function findTaskById(id, { userId }) {
  const task = await Task.findOne({ where: { userId, id } });

  if (!task) {
    throw new ApplicationError(`Task with ID ${id} not found`, 404);
  }

  return task;
}

export async function findTasksPage({ status, page = 1, limit = 10, userId }) {
  const where = { userId };

  if (status) {
    where.status = status;
  }

  const offset = (page - 1) * limit;
  const tasks = await Task.findAndCountAll({
    where,
    offset,
    limit,
    order: [['createdAt', 'DESC']],
  });

  return {
    tasks: tasks.rows,
    total: tasks.count,
  };
}
