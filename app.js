const express = require('express');
const loaders = require('./loaders');
const milddlewares = require('./core/milddlewares');
const gracefulShutdown = require('./core/utils/gracefulShutdown');

const applicationServer = express();

milddlewares({ applicationServer });
applicationServer.disable('etag');

const { httpServer } = loaders.init({ applicationServer });

gracefulShutdown({ applicationServer: httpServer });
module.exports = { applicationServer, httpServer };
