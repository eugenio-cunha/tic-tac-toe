'use strict';

const { Router } = require('express');

const router = Router();

router.use('/', require('./gameRouter'));

module.exports = router;
