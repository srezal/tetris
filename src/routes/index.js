const path = require('path')
const express = require('express'),
    router = express.Router(),
    userRoutes = require('./user.routes.js'),
    gameRoutes = require('./game.routes.js');

router.use('/users', userRoutes);
router.use('/game', gameRoutes);

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'templates', 'index.html'));
});

module.exports = router;