const _ = require('lodash');

module.exports = ({ data, error }) => {
    let status = 200;
    const result = {
        code: 1,
        data,
    };

    if (error) {
        status = 400;
        result.code = 0;
    }


    return _.pickBy({ result, status }, _.identity);
};
