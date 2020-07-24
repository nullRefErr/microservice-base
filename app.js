const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const loaders = require('./loaders');

const app = express();

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

loaders.init(app);

module.exports = app;
