const path = require(`path`);
const dotenv = require(`dotenv`);

//const os = require(`os`);

dotenv.config({
  path: path.join(__dirname, `/.env.${process.env.NODE_ENV}`),
});

const ROBOT_TXT = path.join(__dirname, `/robots.txt`);

//  개발모드인경우 : 개발 true, 운영 : false
const NODE_ENV = process.env.NODE_ENV || `development`;
const isDev = NODE_ENV === `development`;

//  데이터베이스
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

//  몽고
const MONGO_URL = process.env.MONGO_URL;

//const serverCpus = os.cpus().length;
//const envCups = +process.env.OS_CPUS;
//const OS_CPUS = envCups > serverCpus ? 1 : envCups;

module.exports = {
  NODE_ENV: NODE_ENV,
  isDev: isDev,
  PORT: +process.env.PORT || 8080,
  DB_HOST: DB_HOST,
  DB_USER: DB_USER,
  DB_PASS: DB_PASS,
  LOG_DIR: process.env.LOG_DIR,
  OS_CPUS: +process.env.OS_CPUS || 2,
  ROBOT_TXT: ROBOT_TXT,
  AES_KEY: process.env.AES_KEY,
  MONGO: {
    URL: MONGO_URL,
    OPTIONS: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
