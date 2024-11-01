import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as dotenv from 'dotenv';
import * as yup from 'yup';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, '../.env') });

const envSchema = yup.object({
  PORT: yup.number().default(8000),
  DATABASE_URL: yup.string().required(),
  JWT_SECRET: yup.string().required(),
  SERVER_URL: yup.string().required(),
});

envSchema.unknown().validateSync(process.env);

const env = envSchema.cast(process.env, { stripUnknown: true });

export default {
  server: {
    port: env.PORT,
    url: env.SERVER_URL,
  },
  db: {
    url: env.DATABASE_URL,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expireHours: 24 * 30, // 30 days
  },
};
