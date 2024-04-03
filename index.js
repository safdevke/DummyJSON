const express = require('express');
const swaggerUI = require('swagger-ui-express');
const injectMiddleWares = require('./src/middleware');
const errorMiddleware = require('./src/middleware/error');
const authUser = require('./src/middleware/auth');
const routes = require('./src/routes');
const { validateEnvVar, loadDataInMemory } = require('./src/utils/util');
const { version } = require('./package.json');
const apiDocs = require('./src/middleware/apiDocs');

// use database to store logs and custom responses
require('./src/db/mongoose');

const { PORT = 3000, NODE_ENV } = process.env;

// validate if we have all the env variables setup.
validateEnvVar();

const app = express();

// api docs
app.get('/api-docs/swagger.json', apiDocs.swaggerJsDoc);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiDocs.swaggerDocs));

// load all data in memory
loadDataInMemory();

// set up all middleware
injectMiddleWares(app);

// set ejs as view engine
app.set('view engine', 'ejs');

// serving static files
app.use('/static', express.static('./public'));

// routes
app.use('/', routes);

// routes with authorization
app.use('/auth/', authUser, routes);

app.get('*', (req, res) => {
  res.status(404).send('not found!');
});

// use custom middleware for errors
app.use(errorMiddleware);

// start listening
app.listen(PORT, () => {
  console.info(
    `[Node][${NODE_ENV}] App v${version} running at http://localhost:${PORT}`,
  );
});
