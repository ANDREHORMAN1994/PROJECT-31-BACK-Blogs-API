const definePostsCategorie = (sequelize, DataTypes) => {
  const PostsCategorie = sequelize.define(
    'PostsCategorie',
    {},
    {
      timestamps: false,
    },
  );

  PostsCategorie.associate = models => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostsCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostsCategorie;
};

module.exports = definePostsCategorie;
