const express = require('express');
const loaders = require('./loaders');
const milddlewares = require('./milddlewares');

const applicationServer = express();

milddlewares({ applicationServer });

const { httpServer } = loaders.init({ applicationServer });

module.exports = { applicationServer, httpServer };
