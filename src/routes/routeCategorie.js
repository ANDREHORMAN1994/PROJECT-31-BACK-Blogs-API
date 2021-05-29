const express = require('express');

const { controllerCategorie } = require('../controllers');
const { middlewareAuth } = require('../middlewares');

const Categorie = express.Router();

Categorie.use(middlewareAuth.validateToken);

Categorie.get('/categories', controllerCategorie.findAllCategories);

Categorie.post('/categories', controllerCategorie.createCategorie);

module.exports = Categorie;
