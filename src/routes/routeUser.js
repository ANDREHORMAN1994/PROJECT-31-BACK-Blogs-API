const express = require('express');

const { controllerUser } = require('../controllers');

const User = express.Router();

User.get('/users', controllerUser.findAllUsers);

module.exports = User;
