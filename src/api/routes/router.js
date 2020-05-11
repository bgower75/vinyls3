const express = require('express');
const Router = express.Router;
const router = new Router();
const logger = require('../../utils/logger');

router.use((req, res, next) => {
    logger.info("On the router's page");
    next();
});

router.use('/vinyls', require('../controller/vinylController'));

module.exports = router;