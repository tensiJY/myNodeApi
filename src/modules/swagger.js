const swaggerUi = require(`swagger-ui-express`);
const swaggerJsdoc = require(`swagger-jsdoc`);
const { port } = require(`../config/keys`);

const options = {
  swaggerDefinition: {
    openapi: `3.0.0`,
    info: {
      title: 'Test API',
      version: '1.0.0',
      description: 'Test API with express',
    },
    servers: [
      {
        description: 'test 중입니다',
        url: `http://localhost:${port}`,
      },
    ],
    basePath: '/',
  },
  apis: [`./routes/*.js`, `./routes/api/*.js`],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
