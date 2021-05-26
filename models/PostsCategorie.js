const definePostsCategorie = (sequelize, DataTypes) => {
  const PostsCategorie = sequelize.define(
    'PostsCategorie',
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    },
  );
  return PostsCategorie;
};

module.exports = definePostsCategorie;
