const express = require('express');

const { controllerPostsCategorie } = require('../controllers');

const PostsCategorie = express.Router();

PostsCategorie.get('/postscategories', controllerPostsCategorie.findAllPostsCategorie);

module.exports = PostsCategorie;
