const { port, nodeEnv } = require(`./config/keys`);
const logger = require(`./modules/logger`);
const server = require(`./loaders/socketLoader`);

server.listen(port, () => {
  logger.info(`${nodeEnv} server is listening >>> localhost:${port}`);
});
