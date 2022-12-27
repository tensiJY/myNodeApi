const { Server } = require(`socket.io`);
const socket = require(`../modules/socket`);

let io, drv, mgr;

module.exports = {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: '*',
      },
    });

    drv = socket.drvSocket(io);
    mgr = socket.mgrSocket(io);

    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error(`Socket.io not init`);
    }
    return io;
  },
};
