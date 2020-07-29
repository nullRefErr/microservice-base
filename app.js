const express = require('express');
const loaders = require('./loaders');
const milddlewares = require('./milddlewares');
const gracefulShutdown = require('./utils/core/gracefulShutdown');

const applicationServer = express();

milddlewares({ applicationServer });
applicationServer.disable('etag');

const { httpServer } = loaders.init({ applicationServer });

gracefulShutdown({ applicationServer: httpServer });
module.exports = { applicationServer, httpServer };
