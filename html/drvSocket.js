const logger = require(`../logger`);

const Log = require('../../models/sample-log');

exports.drvSocket = (io) => {
  let counter = 0;

  const of = io.of(`/drv`);
  of.use((socket, next) => {
    const header = socket.handshake.headers[`authorization`];
    logger.info(header);
    next();
  });

  of.on(`connection`, (socket) => {
    counter++;
    logger.debug(`drv connected... pid : ${process.pid},  id : ${socket.id}`);

    socket.on(`setMsg`, (data) => {
      logger.debug(`drv setMsg call`);
      const jsonData = JSON.parse(data);

      const log = new Log({
        name: `${socket.id}`,
        message: `${jsonData.msg}`,
      });

      log.save();

      logger.debug(`drv setMsg data : ${data}`);
      //const obj = JSON.parse(data);
      of.emit(`getMsg`, data);
    });
  });

  return of;
};
