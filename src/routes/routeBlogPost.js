const express = require('express');

const { controllerBlogPost } = require('../controllers');

const BlogPost = express.Router();

BlogPost.get('/post', controllerBlogPost.findAllBlogPosts);

BlogPost.get('/post/:id', controllerBlogPost.findByIdBlogPosts);

BlogPost.post('/post', controllerBlogPost.createPost);

BlogPost.put('/post/:id', controllerBlogPost.updatePost);

module.exports = BlogPost;
