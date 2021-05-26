const express = require('express');

const { controllerBlogPost } = require('../controllers');

const BlogPost = express.Router();

BlogPost.get('/blogposts', controllerBlogPost.findAllBlogPosts);

BlogPost.get('/blogposts/:id', controllerBlogPost.findByIdBlogPosts);

module.exports = BlogPost;
