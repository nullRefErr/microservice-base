const fs = require('fs');
const { plural } = require('pluralize');
const AsyncWrapper = require('../utils/core/asyncWrapper');

const filesToExclude = ['index'];
const routesDir = `${process.cwd()}/routes`;

module.exports = ({ applicationServer }) => {
    const dir = fs.readdirSync(routesDir);

    const filteredDir = dir.filter((x) => x !== filesToExclude.map((y) => y));

    filteredDir.forEach((route) => {
        const routeName = route
            .split('.')
            .shift()
            .toLowerCase();
        applicationServer.use(`/${plural(routeName)}`, require(`${routesDir}/${routeName}`));
    });
    applicationServer.use('*', (req, res, next) => next(new Error('Not Found')));
    applicationServer.use((err, req, res, next) => new AsyncWrapper({ err, req, res, next }).errorHandler());
};
