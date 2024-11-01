import { COOKIE_ACCESS_TOKEN_NAME } from '../constants.js';

export function setAccessTokenCookie(req, res, token) {
  res.cookie(COOKIE_ACCESS_TOKEN_NAME, token, {
    httpOnly: true,
  });
}

export function clearAccessTokenCookie(req, res) {
  res.clearCookie(COOKIE_ACCESS_TOKEN_NAME, {
    httpOnly: true,
  });
}
