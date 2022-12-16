const logger = require(`../logger`);

exports.mgrSocket = (io) => {
  let counter = 0;
  const of = io.of(`/mgr`);
  of.use((socket, next) => {
    const header = socket.handshake.headers[`authorization`];
    logger.info(header);
    next();
  });

  of.on(`connection`, (socket) => {
    logger.debug(`mgr connected... pid : ${process.pid},  id : ${socket.id}`);
  });
};
