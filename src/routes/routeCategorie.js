const express = require('express');

const { controllerCategorie } = require('../controllers');

const Categorie = express.Router();

Categorie.get('/categories', controllerCategorie.findAllCategories);

module.exports = Categorie;
