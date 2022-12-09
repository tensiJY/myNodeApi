const express = require(`express`);
const { port } = require(`./config/keys`);
const cors = require(`cors`);
const helmet = require(`helmet`);
const logger = require(`./modules/logger`);
const morganMiddleware = require(`./middlewares/morgan.middleware`);

const { swaggerUi, specs } = require('./modules/swagger');

const apiRoutes = require(`./routes`);

const app = express();

const http = require(`http`);
const server = http.createServer(app);
const { Server } = require(`socket.io`);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

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

//  소켓실행
require(`./modules/socket`)(io);

//  미들웨어
app.use(morganMiddleware);

//  swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//  routes
app.use(`/api`, apiRoutes);

////  에러

/*
//  400
const errorResponder = (err, req, res, next) => {
  res.header('Content-Type', 'application/json');
  console.log(`errorResponder ${err.status}`);
  if (!err.status || err.status == 500) {
    next(err);
  }

  const status = err.status || 400;
  res.status(status).send(err.message);
};

app.use(errorResponder);
*/
//  404
app.use(function (req, res) {
  res.status(404).send('Sorry cant find that!');
});

//  500
app.use(function (err, req, res, next) {
  res.status(500).send('Something broke!');
});

//  run server
server.listen(port, () => {
  logger.info(
    `${process.env.NODE_ENV} server is listening >>> localhost:${port}`
  );
  logger.debug(1);
  logger.error(2);
});
