const model = require('../../models');
const { StatusCodes } = require('http-status-codes');

const findAllPostsCategorie = async (_req, res, next) => {
  try {
    const listPostsCategorie = await model.PostsCategorie.findAll();
    res.status(StatusCodes.OK).json(listPostsCategorie);
  } catch (error) {
    console.log(error);
    next({
      status: StatusCodes.NOT_FOUND,
      message: error.message,
    })
  }
}

module.exports = {
  findAllPostsCategorie,
}
