import 'dotenv/config';

export default {
  PORT: (process.env.PORT) ? process.env.PORT : 3000,
  MONGO_URL: (process.env.MONGO_URL) ? process.env.MONGO_URL : 'mongodb://127.0.0.1:27017/mestodb',
}