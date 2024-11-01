import User from '../models/user.js';

import { getToken } from '../utils/jwt.js';
import { ApplicationError } from '../utils/error.js';
import { normalizeEmail } from '../utils/normalizeEmail.js';
import { hashPassword, validatePassword } from '../utils/hashPassword.js';

export async function register({ email, password }) {
  const hashedPassword = await hashPassword(password);

  const normalizedEmail = normalizeEmail(email);

  //TODO: check for UniqueConstraintError
  const user = await User.create({
    email: normalizedEmail,
    password: hashedPassword,
  });

  const token = getToken(user);

  return { token };
}

export async function login({ email, password }) {
  const normalizedEmail = normalizeEmail(email);

  const user = await User.findOne({ where: { email: normalizedEmail } });

  if (!user) {
    throw new ApplicationError(`User with specific email: ${normalizedEmail} was not found`, 404);
  }

  const { password: hashedPassword, ...restUserFields } = user.toJSON();

  const isValidPassword = await validatePassword(password, hashedPassword);

  if (!isValidPassword) {
    throw new ApplicationError('Invalid password', 401);
  }

  const token = getToken(restUserFields);

  return { token };
}
