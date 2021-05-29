const JWT = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const model = require('../../models');

const SECRET = process.env.SECRET || 'blogApi';

const validateCreateLoginToken = async (userEmail) => {
  const user = await model.User.findOne({
    where: {
      email: userEmail,
    },
  });
  // console.log(user.dataValues);

  if (!user) {
    throw new Error('Invalid fields');
  }

  const userCopy = { ...user.dataValues };
  delete userCopy.password;

  const jwtConfig = {
    expiresIn: 60 * 50,
    algorithm: 'HS256',
  };

  // name, email e role
  const token = JWT.sign({ ...userCopy }, SECRET, jwtConfig);

  return { token };
};

const validateToken = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error('Token not found');
    const decodedJWT = JWT.verify(authorization, SECRET);
    if (!decodedJWT) throw new Error('jwt malformed');
    const { id, email } = decodedJWT;
    req.userId = id;
    req.userEmail = email;
    next();
  } catch (error) {
    if (error.message === 'jwt malformed') {
      next({ status: StatusCodes.UNAUTHORIZED,
        message: 'Expired or invalid token' });
    }
    next({ status: StatusCodes.UNAUTHORIZED,
      message: error.message });
  }
};

// const validateUserAuthorization = async (req, _res, next) => {
//   try {
//     const { id } = req.params;
//     const { userId, userRole } = req;
//     throwError(!ObjectID.isValid(id) || !ObjectID.isValid(userId), null,
//       { status: NOT_FOUND, message: 'id Invalid' });
//     const user = await usersModel.readById(userId);
//     throwError(!user, 'userId did not registered', null);
//     const recipe = await recipesModel.readById(id);
//     throwError(!recipe, 'recipe did not registered', null);
//     throwError(recipe.userId !== userId && userRole === 'user', 'user is not admin', null);
//     next();
//   } catch (error) {
//     if (error.code) {
//       return next({ status: error.code.status, message: error.code.message });
//     }
//     next({ status: UNAUTHORIZED, message: error.message });
//   }
// };

module.exports = {
  validateCreateLoginToken,
  validateToken,
};
