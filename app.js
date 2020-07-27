const express = require('express');
const cookieParser = require('cookie-parser');
const loaders = require('./loaders');

const applicationServer = express();

applicationServer.use(express.json());
applicationServer.use(express.urlencoded({ extended: false }));
applicationServer.use(cookieParser());

const { httpServer } = loaders.init({ applicationServer });

module.exports = { applicationServer, httpServer };
