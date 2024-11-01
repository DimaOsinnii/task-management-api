import jwt from 'jsonwebtoken';

import config from '../config.js';

export const getToken = (user, expiresIn = `${config.jwt.expireHours}h`) => {
  const payload = {
    id: user.id,
  };
  return jwt.sign(payload, config.jwt.secret, { expiresIn });
};

export const verify = (accessToken) => jwt.verify(accessToken, config.jwt.secret);
