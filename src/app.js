const { port, nodeEnv, os } = require(`./config/keys`);
const cluster = require(`cluster`);
const logger = require(`./modules/logger`);

const http = require(`http`);

const server = require(`./loaders/serverLoader`);

const { setupMaster, setupWorker } = require(`@socket.io/sticky`);
const { createAdapter, setupPrimary } = require(`@socket.io/cluster-adapter`);
const { Server } = require(`socket.io`);

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

  httpServer.listen(port, () => {
    logger.debug(`${nodeEnv} server is listening >>> localhost:${port}`);
  });

  const workerLength = os.cpus;

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

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.adapter(createAdapter());

  setupWorker(io);

  require(`./loaders/socketLoader`)(io);
}
