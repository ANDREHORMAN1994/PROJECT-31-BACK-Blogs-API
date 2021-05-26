const model = require('../../models');

const findAllUsers = async (_req, res, next) => {
  try {
    const listUsers = await model.User.findAll();
    res.status(200).json(listUsers);
  } catch (error) {
    console.log(error);
    next({
      status: 404,
      message: error.message,
    })
  }
}

module.exports = {
  findAllUsers,
}
