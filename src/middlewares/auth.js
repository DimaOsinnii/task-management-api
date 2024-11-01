import httpStatus from 'http-status';

import { catchAsync } from '../utils/catchAsync.js';
import { verify } from '../utils/jwt.js';
import { clearAccessTokenCookie } from '../utils/cookie.js';

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: accessToken
 */

export const authOnly = catchAsync((req, res, next) => {
  const token = req.cookies.accessToken;

  try {
    req.user = verify(token);
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    clearAccessTokenCookie(req, res);
    return res.status(httpStatus.UNAUTHORIZED).send({
      error: httpStatus[httpStatus.UNAUTHORIZED],
    });
  }

  return next();
});
