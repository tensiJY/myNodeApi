const express = require(`express`);
const cors = require(`cors`);
const helmet = require(`helmet`);

const morganMiddleware = require(`../middlewares/morganMiddleware`);

const { swaggerUi, specs } = require('../modules/swagger');

const {
  errorPageNotFound,
  errorHandler,
} = require(`../middlewares/errorMiddleware`);

const apiRoutes = require(`../routes`);

module.exports = (http) => {
  const app = express();
  const server = http.createServer(app);

  //  보안모듈
  app.use(helmet());

  //  크로스 도메인 설정
  const corsConfig = {
    origin: true,
    credentials: true,
  };

  app.use(cors(corsConfig));

  //  form and json
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //  미들웨어
  app.use(morganMiddleware);

  //  swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  //  routes
  app.use(`/api`, apiRoutes);

  //  catch 404
  app.use(errorPageNotFound);
  app.use(errorHandler);

  return server;
};
