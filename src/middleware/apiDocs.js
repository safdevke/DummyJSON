const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DummyJSON API',
      version: '1.0.0',
      description: 'DummyJSON API',
    },
    externalDocs: {
      description: 'swagger.json',
      url: '/api-docs/swagger.json',
    },
  },
  apis: ['src/routes/*.js'],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

const swaggerJsDoc = (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
};

module.exports = { swaggerJsDoc, swaggerDocs };
