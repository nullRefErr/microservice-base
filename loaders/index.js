const routesLoader = require('./route');

module.exports.init = (app) => {
    routesLoader(app);
};
