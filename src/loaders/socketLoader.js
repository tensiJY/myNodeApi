const { drvSocket, mgrSocket } = require(`../modules/socket`);

const socketLoader = (io) => {
  drvSocket(io);
  mgrSocket(io);
};

module.exports = socketLoader;
