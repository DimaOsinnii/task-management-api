import { Router } from 'express';

import { validate } from '../middlewares/validate.js';
import { postLoginValidation, postRegisterValidation } from '../validations/auth.validation.js';
import { postLogin, postLogout, postRegister } from '../controllers/auth.controller.js';

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth operations
 */

/**
 * @swagger
 *  /auth/register:
 *     post:
 *       summary: Register user
 *       tags: [Auth]
 *       requestBody:
 *        required: true
 *        content:
 *         application/json:
 *          schema:
 *            $ref: '#/components/validations/PostRegisterBodyParams'
 *       responses:
 *         200:
 *           description: New user
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/models/User'
 */
authRouter.post('/register', validate(postRegisterValidation), postRegister);

/**
 * @swagger
 *  /auth/login:
 *     post:
 *       summary: Log in user
 *       tags: [Auth]
 *       requestBody:
 *        required: true
 *        content:
 *         application/json:
 *          schema:
 *            $ref: '#/components/validations/PostLoginBodyParams'
 *       responses:
 *         200:
 *           description: User
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/models/User'
 */
authRouter.post('/login', validate(postLoginValidation), postLogin);

/**
 * @swagger
 *  /auth/logout:
 *     post:
 *       summary: Log out
 *       description: Clears the user's session cookie to log them out.
 *       tags: [Auth]
 *       responses:
 *         200:
 *           description: Successfully logged out
 */
authRouter.post('/logout', postLogout);

export default authRouter;
