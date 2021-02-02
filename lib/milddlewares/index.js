const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');

module.exports = ({ applicationServer }) => {
    const middlewares = [
        cors(),
        helmet(),
        express.json(),
        express.urlencoded({ extended: false }),
        cookieParser(),
    ];
    middlewares.forEach((x) => applicationServer.use(x));
};
