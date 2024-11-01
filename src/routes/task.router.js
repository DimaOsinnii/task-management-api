import { Router } from 'express';

import {
  postTask,
  getTaskById,
  putTask,
  deleteTask,
  getTasksPage,
} from '../controllers/task.controller.js';
import { validate } from '../middlewares/validate.js';
import {
  getTasksPageValidation,
  postTaskValidation,
  putTaskValidation,
  taskIdValidation,
} from '../validations/task.validation.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task CRUD operations
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/validations/PostTaskBodyParams'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.post('/', validate(postTaskValidation), postTask);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the task to update
 *           example: 1
 *     responses:
 *       200:
 *         description: Task details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.get('/:id', validate(taskIdValidation), getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the task to update
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/validations/PutTaskBodyParams'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.put('/:id', validate(putTaskValidation), putTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the task to update
 *           example: 1
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete('/:id', validate(taskIdValidation), deleteTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get a list of tasks with optional filters and pagination
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [done, todo, in-progress]
 *         description: Filter tasks by status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of tasks per page
 *     responses:
 *       200:
 *         description: List of tasks with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *                 total:
 *                   type: integer
 *                   description: Total number of tasks
 */
router.get('/', validate(getTasksPageValidation), getTasksPage);

export default router;
