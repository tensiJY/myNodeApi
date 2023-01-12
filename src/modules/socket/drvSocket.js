const logger = require(`../logger`);

const Log = require(`../../models/sample-log`);

const namespace = `drv`;

exports.drvSocket = (io) => {
  const of = io.of(`/${namespace}`);
  of.use((socket, next) => {
    const header = socket.handshake.headers[`authorization`];
    logger.info(header);
    next();
  });

  of.on(`connection`, (socket) => {
    logger.debug(`drv connected... pid : ${process.pid},  id : ${socket.id}`);

    socket.on(`setMsg`, async (data) => {
      //logger.debug(`drv setMsg call`);
      //logger.debug(`drv setMsg data : ${data}`);

      logger.info(`drv setMsg call`);
      logger.info(`drv setMsg data : ${data}`);

      const obj = JSON.parse(data);
      const log = new Log({
        socket_id: `${socket.id}`,
        message: obj.msg,
        type: `${namespace}`,
      });

      const savedMsg = await log.save();
      logger.info(savedMsg);
      const totalCount = await Log.find().countDocuments();
      logger.info(`drv >>> totalCount : ${totalCount}`);

      of.emit(`getMsg`, data);
      logger.info('call getMsg client');
    });
  });

  return of;
};
