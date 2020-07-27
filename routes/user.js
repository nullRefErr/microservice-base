const express = require('express');
const AsyncWrapper = require('../utils/core/asyncWrapper');

const router = express.Router();

async function name() {
    throw Error('eren test');
}
/* GET home page. */
router.get('/', (req, res, next) => new AsyncWrapper({ err: undefined, req, res, next }).asyncHandler(name()));

module.exports = router;
