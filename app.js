const express = require('express');
const loaders = require('./lib/loaders');
const milddlewares = require('./lib/milddlewares');
const gracefulShutdown = require('./lib/utils/gracefulShutdown');

const applicationServer = express();

milddlewares({ applicationServer });
applicationServer.disable('etag');

const { httpServer } = loaders.init({ applicationServer });

gracefulShutdown({ applicationServer: httpServer });
module.exports = { applicationServer, httpServer };
