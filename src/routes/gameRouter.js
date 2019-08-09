'use strict';

const { Router } = require('express');
const { gameController } = require('../controllers');

const router = Router();

router.post('/game', gameController.game);

router.post('/game/:id/movement', gameController.movement);

module.exports = router;
