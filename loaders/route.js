const fs = require('fs');
const { plural } = require('pluralize');

const filesToExclude = ['index'];
const routesDir = `${process.cwd()}/routes`;

module.exports = (app) => {
    const dir = fs.readdirSync(routesDir);

    const filteredDir = dir.filter((x) => x !== filesToExclude.map((y) => y));

    filteredDir.forEach((route) => {
        const routeName = route
            .split('.')
            .shift()
            .toLowerCase();
        app.use(`/${plural(routeName)}`, require(`${routesDir}/${routeName}`));
    });
};
