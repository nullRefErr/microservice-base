const serverLoader = require('./server');
const routesLoader = require('./route');
const mongoLoader = require('./mongo');

module.exports.init = ({ applicationServer }) => {
    const { httpServer } = serverLoader({ applicationServer });
    routesLoader({ applicationServer });
    mongoLoader.init();

    return { httpServer };
};
