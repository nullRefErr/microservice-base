const express = require('express');
const AsyncWrapper = require('../lib/utils/asyncWrapper');
const { dummyController } = require('../controllers');

const router = express.Router();

/* GET /. */
router.get('/', (req, res, next) => new AsyncWrapper({ err: undefined, req, res, next })
    .asyncHandler(dummyController.helloWorld(req.body)));

router.get('/dbexample', (req, res, next) => new AsyncWrapper({ err: undefined, req, res, next })
    .asyncHandler(dummyController.dbExample(req.body)));

module.exports = router;
