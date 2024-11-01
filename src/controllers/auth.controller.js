import httpStatus from 'http-status';

import { catchAsync } from '../utils/catchAsync.js';
import { login, register } from '../services/auth.service.js';
import { clearAccessTokenCookie, setAccessTokenCookie } from '../utils/cookie.js';

export const postRegister = catchAsync(async (req, res) => {
  const { token } = await register(req.body);

  setAccessTokenCookie(req, res, token);

  return res.status(httpStatus.OK).send();
});

export const postLogin = catchAsync(async (req, res) => {
  const { token } = await login(req.body);

  setAccessTokenCookie(req, res, token);

  return res.status(httpStatus.OK).send();
});

export const postLogout = catchAsync(async (req, res) => {
  clearAccessTokenCookie(req, res);

  return res.status(httpStatus.OK).send();
});
