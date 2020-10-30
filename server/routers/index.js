const express = require('express');
const router = express.Router();

const routeUsers = require('./users');
const routeApi = require('./api')

router.use('/', routeUsers);
router.use('/', routeApi);

module.exports = router;