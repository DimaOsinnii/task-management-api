import { Router } from 'express';

import docsRouter from './routes/docs.router.js';
import authRouter from './routes/auth.router.js';
import taskRouter from './routes/task.router.js';
import { authOnly } from './middlewares/auth.js';

const router = Router();

router.use('/docs', docsRouter);
router.use('/auth', authRouter);
router.use('/tasks', authOnly, taskRouter);

export default router;
