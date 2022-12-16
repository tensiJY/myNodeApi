const logger = require(`../logger`);

exports.drvSocket = (io) => {
  let counter = 0;

  const of = io.of(`/drv`);
  of.use((socket, next) => {
    const header = socket.handshake.headers[`authorization`];
    logger.info(header);
    next();
  });

  of.on(`connection`, (socket) => {
    logger.debug(`drv connected... pid : ${process.pid},  id : ${socket.id}`);
  });
};
