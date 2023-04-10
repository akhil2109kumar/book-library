import { cleanEnv, port, str } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),

    MONGODB_URI_LOCAL: str(),
  });
};

export default validateEnv;
