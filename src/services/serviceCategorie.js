const model = require('../../models');

const validateBodyCreateCategorie = (name) => {
  if (!name) {
    throw new Error('"name" is required');
  }
};

const createNewCategorie = async (name) => {
  validateBodyCreateCategorie(name);

  const newCategorie = await model.Categorie.create({ name });
  if (!newCategorie) throw new Error('"newCategorie" error to create');

  return newCategorie;
};

module.exports = {
  createNewCategorie,
};
