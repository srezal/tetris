const path = require('path')
const express = require('express'),
    router = express.Router()
    // UserController = require('../controllers/users.controller'),
    // UsersService = require('../services/users.service');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'templates', 'game.html'));
});
      

module.exports = router;