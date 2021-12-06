const jwt = require('jsonwebtoken');
const Errors = require('../helper/authErrors');
const UsersModel = require('../models/users');

const SECRET = 'secret';

const validateToken = async (token) => {
  try {
    const { email, password } = jwt.verify(token, SECRET);
    const { _id, role } = await UsersModel.getByLoginData(email, password);
    if (_id) return { id: _id, role };
    throw new Error('invalid token');
  } catch (err) {
    return false;
  }
};

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(Errors.missingToken.status).json({ message: Errors.missingToken.message });
  }

  const userToken = await validateToken(token);
  if (userToken) {
    req.userId = userToken.id;
    req.userRole = userToken.role;
    return next();
  }
  req.userRole = 'user';
  req.userId = false;
  return next();
};
