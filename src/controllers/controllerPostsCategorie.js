const model = require('../../models');

const findAllPostsCategorie = async (_req, res, next) => {
  try {
    const listPostsCategorie = await model.PostsCategorie.findAll();
    res.status(200).json(listPostsCategorie);
  } catch (error) {
    console.log(error);
    next({
      status: 404,
      message: error.message,
    })
  }
}

module.exports = {
  findAllPostsCategorie,
}
