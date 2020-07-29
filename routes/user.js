const express = require('express');
const AsyncWrapper = require('../utils/core/asyncWrapper');

const router = express.Router();

async function name() {
    return { a: 1 };
}
/* GET home page. */
router.get('/', (req, res, next) => new AsyncWrapper({ err: undefined, req, res, next }).asyncHandler(name()));

module.exports = router;
