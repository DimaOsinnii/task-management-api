import crypto from 'node:crypto';

// The following functions is adapted from the `metautil` library under the MIT License.
// Source: https://github.com/metarhia/metautil/blob/master/lib/crypto.js
const HASH_PARTS = 5;
const SALT_LEN = 32;
const KEY_LEN = 64;
// Only change these if you know what you're doing
const SCRYPT_PARAMS = { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const SCRYPT_PREFIX = '$scrypt$N=32768,r=8,p=1,maxmem=67108864$';

function serializeHash(hash, salt) {
  const saltString = salt.toString('base64').split('=')[0];
  const hashString = hash.toString('base64').split('=')[0];
  return `${SCRYPT_PREFIX}${saltString}$${hashString}`;
}

function parseOptions(options = '') {
  const values = [];
  const items = options.split(',');

  for (const item of items) {
    const [key, val] = item.split('=');
    values.push([key, Number(val)]);
  }

  return Object.fromEntries(values);
}

function deserializeHash(phcString = '') {
  const parts = phcString.split('$');

  if (parts.length !== HASH_PARTS) {
    throw new Error('Invalid format; Expected $name$options$salt$hash');
  }
  const [, name, options, salt64, hash64] = parts;

  if (name !== 'scrypt') {
    throw new Error('Node.js crypto module only supports scrypt');
  }

  const params = parseOptions(options);
  const salt = Buffer.from(salt64, 'base64');
  const hash = Buffer.from(hash64, 'base64');
  return { params, salt, hash };
}

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(SALT_LEN, (err, salt) => {
      if (err) return reject(err);
      return crypto.scrypt(password, salt, KEY_LEN, SCRYPT_PARAMS, (error, hash) => {
        if (err) return reject(error);
        return resolve(serializeHash(hash, salt));
      });
    });
  });
}

function validatePassword(password, serializedHash) {
  const { params, salt, hash } = deserializeHash(serializedHash);
  return new Promise((resolve, reject) => {
    const callback = (err, hashedPassword) => {
      if (err) return reject(err);

      return resolve(crypto.timingSafeEqual(hashedPassword, hash));
    };
    crypto.scrypt(password, salt, hash.length, params, callback);
  });
}

export { hashPassword, validatePassword };
