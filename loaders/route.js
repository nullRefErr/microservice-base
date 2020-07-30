const fs = require('fs');
const { plural } = require('pluralize');
const AsyncWrapper = require('../core/utils/asyncWrapper');
const { ServiceUnavailable, NotFound } = require('../core/types/error');
const { getStatus } = require('../core/utils/gracefulShutdown');

const filesToExclude = ['index'];
const routesDir = `${process.cwd()}/routes`;

module.exports = ({ applicationServer }) => {
    const dir = fs.readdirSync(routesDir);

    const filteredDir = dir.filter((x) => x !== filesToExclude.map((y) => y));

    applicationServer.use('/', (req, res, next) => {
        if (!getStatus().server) {
            return next(new ServiceUnavailable());
        }
        return next();
    });
    filteredDir.forEach((route) => {
        const routeName = route
            .split('.')
            .shift()
            .toLowerCase();
        applicationServer.use(`/${plural(routeName)}`, require(`${routesDir}/${routeName}`));
    });
    applicationServer.use('*', (req, res, next) => next(new NotFound()));
    applicationServer.use((err, req, res, next) => new AsyncWrapper({ err, req, res, next }).errorHandler());
};
