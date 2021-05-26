const model = require('../../models');

const findAllCategories = async (_req, res, next) => {
  try {
    const listCategories = await model.Categorie.findAll();
    res.status(200).json(listCategories);
  } catch (error) {
    console.log(error);
    next({
      status: 404,
      message: error.message,
    })
  }
}

module.exports = {
  findAllCategories,
}
