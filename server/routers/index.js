const express = require('express');
const router = express.Router();

const routeUsers = require('./users');

router.use('/', routeUsers);

module.exports = router;