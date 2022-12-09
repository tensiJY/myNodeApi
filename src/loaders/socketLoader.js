const server = require(`./serverLoader`);
const logger = require(`../modules/logger`);

const { Server } = require(`socket.io`);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let counter = 0;
const mIo = io.of(`/m`);
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

module.exports = server;
