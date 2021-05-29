const model = require('../../models');

const { middlewareAuth } = require('../middlewares');

const validateBodyCreateUser = (displayName, image) => {
  if (!displayName) {
    throw new Error('"displayName" is required');
  }

  if (typeof displayName !== 'string') {
    throw new Error('"displayName" must be a string');
  }

  if (displayName.length < 8) {
    throw new Error('"displayName" length must be at least 8 characters long');
  }

  if (!image) {
    throw new Error('"image" is required');
  }
};

const validateBodyCreateToken = (email, password) => {
  if (!email || !password) {
    throw new Error('Campos inválidos');
  }
};

const createNewToken = async (email, password) => {
  validateBodyCreateToken(email, password);
  const newToken = await middlewareAuth.validateCreateLoginToken(email);
  if (!newToken) throw new Error('"newToken" error to create');
  return newToken;
};

const createNewUser = async (displayName, email, password, image) => {
  validateBodyCreateUser(displayName, image);

  const findUser = await model.User.findOne({
    where: {
      email: email,
    },
  });
  if (findUser) throw new Error('User already registered');

  const newUser = await model.User.create({
    displayName,
    email,
    password,
    image,
  });
  // console.log(newUser);
  if (!newUser) throw new Error('"newUser" error to create');

  return await createNewToken(email, password);
};

module.exports = {
  createNewUser,
  createNewToken,
};
