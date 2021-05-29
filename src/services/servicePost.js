const model = require('../../models');

const validateBodyCreatePost = (title, content, categoryId) => {
  if (!title) {
    throw new Error('"title" is required');
  }
  if (!content) {
    throw new Error('"content" is required');
  }
  if (!categoryId) {
    throw new Error('"categoryIds" is required');
  }
};

const createNewPost = async (userId, title, content, categoryId) => {
  validateBodyCreatePost(title, content, categoryId);
  // console.log('categoryId', typeof categoryId);
  // const listCategoryId = JSON.parse(categoryId);

  const newPost = await model.BlogPost.create({
    title,
    content,
    userId,
    published: new Date(),
    updated: new Date(),
  });
  if (!newPost) throw new Error('"newPost" error to create');

  if (typeof categoryId === 'object') {
    const listPromisesCategorieById = categoryId.map(id =>
      model.Categorie.findByPk(id),
    );

    const verifyCategorie = await Promise.all(listPromisesCategorieById);
    // console.log(verifyCategorie, 'ESSE AQUI');
    if (!verifyCategorie[0]) throw new Error('"categoryIds" not found');

    const listPromisesCreatePostsCategorie = categoryId.map(id =>
      model.PostsCategorie.create({
        postId: parseInt(newPost.id, 10),
        categoryId: parseInt(id, 10),
      }),
    );

    const createPostsCategorie = await Promise.all(
      listPromisesCreatePostsCategorie,
    );

    if (!createPostsCategorie)
      throw new Error('"createPostsCategorie" error to create');
  } else {
    const createPostsCategorie = await model.PostsCategorie.create({
      postId: parseInt(newPost.id, 10),
      categoryId: parseInt(categoryId, 10),
    });
    if (!createPostsCategorie)
      throw new Error('"createPostsCategorie" error to create');
  }

  return { id: newPost.id, userId, title, content };
};

const findById = async id => {
  const blogPost = await model.BlogPost.findByPk(id, {
    include: [
      { model: model.User, as: 'user' },
      { model: model.Categorie, as: 'categories' },
    ],
  });

  if (!blogPost) throw new Error('Post does not exist');

  const categories = blogPost.categories.map(categorie => ({
    id: categorie.id,
    name: categorie.name,
  }));

  return { ...blogPost.dataValues, categories };
};

const validateBodyUpdatePost = (title, content) => {
  if (!title) {
    throw new Error('"title" is required');
  }
  if (!content) {
    throw new Error('"content" is required');
  }
};

const updateNewPost = async (id, title, content) => {
  validateBodyUpdatePost(title, content);

  const updatePost = await model.BlogPost.update(
    { title, content },
    {
      where: {
        id,
      },
    },
  );
  if (!updatePost) throw new Error('"updateNewPost" error to create');

  return findById(id);
};

module.exports = {
  createNewPost,
  updateNewPost,
  findById,
};
