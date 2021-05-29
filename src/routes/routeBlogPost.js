const express = require('express');

const { controllerBlogPost } = require('../controllers');

const BlogPost = express.Router();

BlogPost.get('/post', controllerBlogPost.findAllBlogPosts);

BlogPost.get(
  '/post/search',
  controllerBlogPost.findQueryBlogPosts,
);

BlogPost.get('/post/:id', controllerBlogPost.findByIdBlogPosts);

BlogPost.post('/post', controllerBlogPost.createPost);

BlogPost.put('/post/:id', controllerBlogPost.updatePost);

BlogPost.delete('/post/:id', controllerBlogPost.deletePost);

module.exports = BlogPost;
