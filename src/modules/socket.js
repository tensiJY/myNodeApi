const logger = require('./logger');

const mySocket = (socketIo) => {
  let counter = 0;
  const mIo = socketIo.of(`/m`);
  mIo.use((socket, next) => {
    const header = socket.handshake.headers[`authorization`];
    logger.info(header);
    next();
  });

  mIo.on(`connection`, (socket) => {
    logger.info(`connected... id : ${socket.id}`);
  });

  setInterval(() => {
    counter++;
    mIo.emit(`counter`, { counter });
  }, 1000);
};

module.exports = mySocket;
