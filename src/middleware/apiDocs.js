const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DummyJSON API',
      version: '0.0.5',
      description:
        'Get dummy/fake JSON data to use as placeholder in development or in prototype testing.',
      contact: {
        name: 'DummyJSON API',
        url: 'https://dummyjson.com/',
      },
      license: {
        name: 'MIT License (MIT)',
        url: 'https://github.com/Ovi/DummyJSON/blob/master/LICENCE',
      },
    },
    servers: [
      {
        url: 'http://dummyjson.com',
        description: 'Production server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
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
