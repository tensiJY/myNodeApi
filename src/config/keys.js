const path = require(`path`);
const dotenv = require(`dotenv`);

//  개발모드인경우 : 개발 true, 운영 : false
//  EXE build 이므로 환경변수 설정하지 않았을 경우 자동적으로 운영환경 설정

const NODE_ENV = process.env.NODE_ENV || `production`;

dotenv.config({
  path: path.join(__dirname, `/.env.${NODE_ENV}`),
});

const ROBOT_TXT = path.join(__dirname, `/robots.txt`);

const isDev = NODE_ENV === `development`;

const LOG_DIR = process.env.LOG_DIR;

const LOG_DIR_PATH = process.pkg ? `.${LOG_DIR}` : LOG_DIR;

//  몽고
const MONGO_URL = process.env.MONGO_URL;

//const serverCpus = os.cpus().length;
//const envCups = +process.env.OS_CPUS;
//const OS_CPUS = envCups > serverCpus ? 1 : envCups;

module.exports = {
  NODE_ENV: NODE_ENV,
  isDev: isDev,
  PORT: +process.env.PORT || 8080,
  LOG_DIR: LOG_DIR_PATH,
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
