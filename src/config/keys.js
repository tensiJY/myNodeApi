const path = require(`path`);
const dotenv = require(`dotenv`);

//const os = require(`os`);

dotenv.config({
  path: path.join(__dirname, `/.env.${process.env.NODE_ENV}`),
});

//  개발모드인경우 : 개발 true, 운영 : false
const NODE_ENV = process.env.NODE_ENV || `development`;
const isDev = NODE_ENV === `development`;

//  포트 설정
const PORT = +process.env.PORT || 80;

//  데이터베이스
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

//  logger
const LOG_DIR = process.env.LOG_DIR;

//const serverCpus = os.cpus().length;
//const envCups = +process.env.OS_CPUS;
//const OS_CPUS = envCups > serverCpus ? 1 : envCups;
const OS_CPUS = +process.env.OS_CPUS || 2;

module.exports = {
  nodeEnv: NODE_ENV,
  isDev: isDev,
  port: PORT,
  db: {
    host: DB_HOST,
    user: DB_USER,
    pass: DB_PASS,
  },
  log: {
    dir: LOG_DIR,
  },
  os: {
    cpus: OS_CPUS,
  },
};
