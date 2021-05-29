const { StatusCodes } = require('http-status-codes');

const model = require('../../models');
const service = require('../services');

const findAllUsers = async (_req, res, next) => {
  try {
    const listUsers = await model.User.findAll();
    const resultUsers = listUsers.map(user => {
      return {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        image: user.image,
      };
    });
    res.status(StatusCodes.OK).json(resultUsers);
  } catch (error) {
    console.log(error);
    next({
      status: StatusCodes.NOT_FOUND,
      message: error.message,
    });
  }
};

const findUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listUser = await model.User.findByPk(id);
    if (!listUser) throw new Error('User does not exist');
    const user = {
      id: listUser.id,
      displayName: listUser.displayName,
      email: listUser.email,
      image: listUser.image,
    };
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log(error);
    next({
      status: StatusCodes.NOT_FOUND,
      message: error.message,
    });
  }
};

const createUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const listUsers = await service.serviceUser.createNewUser(
      displayName,
      email,
      password,
      image,
    );
    res.status(StatusCodes.CREATED).json(listUsers);
  } catch (error) {
    console.log(error);
    if (error.message === 'User already registered') {
      return next({
        status: StatusCodes.CONFLICT,
        message: error.message,
      });
    }
    next({
      status: StatusCodes.BAD_REQUEST,
      message: error.message,
    });
  }
};

const createTokenLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await service.serviceUser.createNewToken(email, password);
    res.status(StatusCodes.OK).json(token);
  } catch (error) {
    console.log(error);
    next({
      status: StatusCodes.BAD_REQUEST,
      message: error.message,
    });
  }
};

const deleteUserByToken = async (req, res, next) => {
  try {
    const result = await model.User.destroy({
      where: {
        id: req.userId,
      },
    });
    res.status(StatusCodes.NO_CONTENT).json(result);
  } catch (error) {
    console.log(error);
    next({
      status: StatusCodes.BAD_REQUEST,
      message: error.message,
    });
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  createTokenLogin,
  deleteUserByToken,
};
