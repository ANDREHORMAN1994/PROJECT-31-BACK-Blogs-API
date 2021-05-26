const model = require('../../models');

const findAllBlogPosts = async (_req, res, next) => {
  try {
    const listBlogPosts = await model.BlogPost.findAll();
    res.status(200).json(listBlogPosts);
  } catch (error) {
    console.log(error);
    next({
      status: 404,
      message: error.message,
    });
  }
};

const findByIdBlogPosts = async (req, res, next) => {
  try {
    const blogPost = await model.BlogPost.findByPk(req.params.id, {
      include: { model: model.User, as: 'user' },
    });
    res.status(200).json(blogPost);

    // const blogPost = await model.BlogPost.findByPk(req.params.id);
    // const user = await blogPost.getUser();
    // res.status(200).json({ ...blogPost.dataValues, user });
  } catch (error) {
    console.log(error);
    next({
      status: 404,
      message: error.message,
    });
  }
};

module.exports = {
  findAllBlogPosts,
  findByIdBlogPosts,
};
