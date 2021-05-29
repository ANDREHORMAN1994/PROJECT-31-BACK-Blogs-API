const { StatusCodes } = require('http-status-codes');

const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const throwErros = (condition, message) => {
  if (condition) throw new Error(message);
};

const validateEmailPassword = (req, _res, next) => {
  try {
    const { email, password } = req.body;
    throwErros(email === undefined, '"email" is required');
    throwErros(!email.length, '"email" is not allowed to be empty');
    throwErros(!validateEmail(email), '"email" must be a valid email');
    throwErros(password === undefined, '"password" is required');
    throwErros(!password.length, '"password" is not allowed to be empty');
    throwErros(password.length < 6,
      '"password" length must be 6 characters long');
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
