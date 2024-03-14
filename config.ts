import "dotenv/config";

export default {
  PORT: process.env.PORT ? process.env.PORT : 3000,
  MONGO_URL: process.env.MONGO_URL
    ? process.env.MONGO_URL
    : "mongodb://127.0.0.1:27017/mestodb",
  JWT_SECRET: process.env.JWT_SECRET
    ? process.env.JWT_SECRET
    : "38bb0bbb35c6e347d6e077a11c782384a950127d9f6ef2a054084bc3f7b9584a",
};
