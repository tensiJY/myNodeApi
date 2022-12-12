const cluster = require("cluster");
const http = require("http");
const { Server } = require("socket.io");
const numCPUs = require("os").cpus().length;
const { setupMaster, setupWorker } = require("@socket.io/sticky");
const { createAdapter, setupPrimary } = require("@socket.io/cluster-adapter");

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  const httpServer = http.createServer();

  // setup sticky sessions
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });

  // setup connections between the workers
  setupPrimary();

  // needed for packets containing buffers (you can ignore it if you only send plaintext objects)
  // Node.js < 16.0.0
  //cluster.setupMaster({
  //  serialization: "advanced",
  //});
  // Node.js > 16.0.0
  cluster.setupPrimary({
    serialization: "advanced",
  });

  httpServer.listen(80);

  //  numCPUs
  for (let i = 0; i < 2; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const httpServer = http.createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // use the cluster adapter
  io.adapter(createAdapter());

  // setup connection with the primary process
  setupWorker(io);

  let counter = 0;

  io.on("connection", (socket) => {
    const userId = socket.id;
    const obj = {
      msg: `${counter} - ${userId}가 입장하였습니다 - ${process.pid}`,
    };
    console.log(`${counter}, ${userId}, ${process.pid}`);
    //  io.emit >> 전체에게 보냄
    io.emit(`enter`, JSON.stringify(obj));

    counter++;

    //  clinet에서 전달받음
    socket.on("setMsg", (data) => {
      console.log(`call setMsg : ${data}`);
      const obj = JSON.parse(data);
      const msg = obj.msg;

      io.emit(
        "getMsg",
        JSON.stringify({
          msg: msg,
        })
      );
    });

    socket.on("disconnect", (data) => {
      console.log(data);
      console.log(`${socket.id}`);
    });
  });
}
