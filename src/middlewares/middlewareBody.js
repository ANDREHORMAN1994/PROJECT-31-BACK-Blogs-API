const { StatusCodes } = require('http-status-codes');

const validateEmail = email => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const validateEmailPassword = (req, _res, next) => {
  try {
    const { email, password } = req.body;
    if (email === undefined) {
      throw new Error('"email" is required');
    }

    if (!email.length) {
      throw new Error('"email" is not allowed to be empty');
    }

    if (!validateEmail(email)) {
      throw new Error('"email" must be a valid email');
    }

    if (password === undefined) {
      throw new Error('"password" is required');
    }

    if (!password.length) {
      throw new Error('"password" is not allowed to be empty');
    }

    if (password.length < 6) {
      throw new Error('"password" length must be 6 characters long');
    }
    next();
  } catch (error) {
    console.log(error);
    next({
      status: StatusCodes.BAD_REQUEST,
      message: error.message,
    });
  }
};

module.exports = {
  validateEmailPassword,
};
