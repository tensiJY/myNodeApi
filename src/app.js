const { PORT, NODE_ENV, OS_CPUS, MONGO } = require(`./config/keys`);
const cluster = require(`cluster`);
const logger = require(`./modules/logger`);

const http = require(`http`);

const server = require(`./loaders/serverLoader`);

const { setupMaster, setupWorker } = require(`@socket.io/sticky`);
const { createAdapter, setupPrimary } = require(`@socket.io/cluster-adapter`);

/*
//  클러스터 : 마스터
if (cluster.isMaster) {
  logger.debug(`Master : ${process.pid} is running`);

  const httpServer = http.createServer();

  setupMaster(httpServer, {
    loadBalancingMethod: 'least-connection',
  });

  setupPrimary();

  //  Node.js < 16.0.0
  //cluster.setupMaster({
  //  serialization: "advanced",
  //});
  // Node.js > 16.0.0
  cluster.setupPrimary({
    serialization: 'advanced',
  });

  httpServer.listen(PORT, () => {
    logger.debug(`${NODE_ENV} server is listening >>> localhost:${PORT}`);
  });

  const workerLength = OS_CPUS;

  for (let i = 0; i < workerLength; i++) {
    cluster.fork();
  }

  cluster.on(`exit`, (worker) => {
    logger.debug(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  logger.debug(`Worker ${process.pid} started`);

  const httpServer = server(http);
  const io = require(`./loaders/socketLoader`).init(httpServer);

  io.adapter(createAdapter());

  setupWorker(io);
}
*/

const mongoose = require(`mongoose`);

mongoose.set('strictQuery', false);
mongoose
  .connect(MONGO.URL, MONGO.OPTIONS)
  .then(() => {
    //  클러스터 : 마스터
    if (cluster.isMaster) {
      logger.debug(`Master : ${process.pid} is running`);

      const httpServer = http.createServer();

      setupMaster(httpServer, {
        loadBalancingMethod: 'least-connection',
      });

      setupPrimary();

      //  Node.js < 16.0.0
      //cluster.setupMaster({
      //  serialization: "advanced",
      //});
      // Node.js > 16.0.0
      cluster.setupPrimary({
        serialization: 'advanced',
      });

      httpServer.listen(PORT, () => {
        logger.debug(`${NODE_ENV} server is listening >>> localhost:${PORT}`);
      });

      const workerLength = OS_CPUS;

      for (let i = 0; i < workerLength; i++) {
        cluster.fork();
      }

      cluster.on(`exit`, (worker) => {
        logger.debug(`Worker ${worker.process.pid} died`);
        cluster.fork();
      });
    } else {
      logger.debug(`Worker ${process.pid} started`);

      const httpServer = server(http);
      const io = require(`./loaders/socketLoader`).init(httpServer);

      io.adapter(createAdapter());

      setupWorker(io);
    }
  })
  .catch((err) => {
    logger.info(`server is shutdown..`);
    logger.error(`mongo connection : error`);
    logger.error(err);
  });
