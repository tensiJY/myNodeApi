const logger = require(`../logger`);

exports.mgrSocket = (io) => {

  const of = io.of(`/mgr`);
  of.use((socket, next) => {
    const header = socket.handshake.headers[`authorization`];
    logger.info(header);
    next();
  });

  of.on(`connection`, (socket) => {
    logger.debug(`mgr connected... pid : ${process.pid},  id : ${socket.id}`);

    socket.on(`setMsg`, (data) => {
      logger.debug(`mgr setMsg call`);
      logger.debug(`mgr setMsg data : ${data}`);
      //const obj = JSON.parse(data);
      of.emit(`getMsg`, data);
    });
  });

  return of;
};
