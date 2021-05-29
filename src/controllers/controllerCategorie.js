const { StatusCodes } = require('http-status-codes');

const model = require('../../models');
const service = require('../services');

const findAllCategories = async (_req, res, next) => {
  try {
    const listCategories = await model.Categorie.findAll();
    res.status(StatusCodes.OK).json(listCategories);
  } catch (error) {
    console.log(error);
    next({
      status: StatusCodes.NOT_FOUND,
      message: error.message,
    });
  }
};

const createCategorie = async (req, res, next) => {
  try {
    const { name } = req.body;
    const categorie = await service.serviceCategorie.createNewCategorie(name);
    res.status(StatusCodes.CREATED).json(categorie);
  } catch (error) {
    console.log(error);
    // if (error.message === 'User already registered') {
    //   return next({
    //     status: StatusCodes.CONFLICT,
    //     message: error.message,
    //   });
    // }
    next({
      status: StatusCodes.BAD_REQUEST,
      message: error.message,
    });
  }
};

module.exports = {
  findAllCategories,
  createCategorie,
};
