const express = require('express');

const { middlewareBody, middlewareAuth } = require('../middlewares');
const { controllerUser } = require('../controllers');
const {
  createUser,
  findAllUsers,
  createTokenLogin,
  findUserById,
  deleteUserByToken,
} = controllerUser;

const User = express.Router();

User.post('/login', [middlewareBody.validateEmailPassword], createTokenLogin);

User.post('/user', [middlewareBody.validateEmailPassword], createUser);

User.use(middlewareAuth.validateToken);

User.get('/user', findAllUsers);

User.get('/user/:id', findUserById);

User.delete('/user/me', deleteUserByToken);

module.exports = User;
