const serverLoader = require('./server');
const routesLoader = require('./route');

module.exports.init = ({ applicationServer }) => {
    const { httpServer } = serverLoader({ applicationServer });
    routesLoader({ applicationServer });

    return { httpServer };
};
