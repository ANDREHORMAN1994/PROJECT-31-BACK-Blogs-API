const { Op } = require('sequelize');
const { StatusCodes } = require('http-status-codes');

const model = require('../../models');
const service = require('../services');

const messageUnauthorized = 'Unauthorized user';

const handleListBlogs = (list) => {
  const result = list.map((post) => {
    const categories = post.categories.map((categorie) => ({
      id: categorie.id,
      name: categorie.name,
    }));
    return { ...post.dataValues, categories };
  });
  return result;
};

const findAllBlogPosts = async (_req, res, next) => {
  try {
    const listBlogPosts = await model.BlogPost.findAll({
      include: [
        { model: model.User, as: 'user' },
        { model: model.Categorie, as: 'categories' },
      ],
    });

    res.status(StatusCodes.OK).json(handleListBlogs(listBlogPosts));
  } catch (error) {
    console.log(error);
    next({
      status: StatusCodes.NOT_FOUND,
      message: error.message,
    });
  }
};

const handleQueryBlogPosts = async (q) => {
  const listBlogPosts = await model.BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: [
      { model: model.User, as: 'user' },
      { model: model.Categorie, as: 'categories' },
    ],
  });
  return listBlogPosts;
};

const findQueryBlogPosts = async (req, res, next) => {
  try {
    const { q } = req.query;
    const listBlogPosts = await handleQueryBlogPosts(q);
    res.status(StatusCodes.OK).json(handleListBlogs(listBlogPosts));
  } catch (error) {
    console.log(error);
    next({ status: StatusCodes.NOT_FOUND,
      message: error.message });
  }
};

const findByIdBlogPosts = async (req, res, next) => {
  try {
    // Eager Loading
    const post = await service.servicePost.findById(req.params.id);
    res.status(StatusCodes.OK).json(post);

    // Lazy Loading
    /* const blogPost = await model.BlogPost.findByPk(req.params.id);
    const user = await blogPost.getUser();
    res.status(StatusCodes.OK).json({ ...blogPost.dataValues, user }); */
  } catch (error) {
    console.log(error);
    next({
      status: StatusCodes.NOT_FOUND,
      message: error.message,
    });
  }
};

const createPost = async (req, res, next) => {
  try {
    const { userId } = req;
    const { title, content, categoryIds } = req.body;
    const post = await service.servicePost.createNewPost(
      userId,
      title,
      content,
      categoryIds,
    );
    res.status(StatusCodes.CREATED).json(post);
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

const deleteKeysPost = (post) => {
  const newPost = post;
  delete newPost.id;
  delete newPost.user;
  delete newPost.published;
  delete newPost.updated;
  return newPost;
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    if (req.body.categoryIds) throw new Error('Categories cannot be edited');
    const post = await service.servicePost.updateNewPost(id, title, content);
    if (req.userId !== post.userId) throw new Error(messageUnauthorized);
    res.status(StatusCodes.OK).json(deleteKeysPost(post));
  } catch (error) {
    console.log(error);
    if (error.message === messageUnauthorized) {
      return next({ status: StatusCodes.UNAUTHORIZED,
        message: error.message });
    }
    next({ status: StatusCodes.BAD_REQUEST,
      message: error.message });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await service.servicePost.findById(id);
    if (req.userId !== post.userId) throw new Error(messageUnauthorized);
    const result = await model.BlogPost.destroy({
      where: { id } });
    res.status(StatusCodes.NO_CONTENT).json(result);
  } catch (error) {
    console.log(error);
    if (error.message === messageUnauthorized) {
      return next({ status: StatusCodes.UNAUTHORIZED,
        message: error.message });
    }
    next({ status: StatusCodes.NOT_FOUND,
      message: error.message });
  }
};

module.exports = {
  findAllBlogPosts,
  findQueryBlogPosts,
  findByIdBlogPosts,
  createPost,
  updatePost,
  deletePost,
};
