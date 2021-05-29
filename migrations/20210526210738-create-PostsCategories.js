module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('PostsCategories', {
      postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return await queryInterface.dropTable('PostsCategories');
  },
};
