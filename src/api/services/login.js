const jwt = require('jsonwebtoken');

const UsersModel = require('../models/users');
const Errors = require('../helper/loginErrors');

const SECRET = 'secret';
const jwtConfig = {
  algorithm: 'HS256',
};

const validateFields = (email, password) => {
  switch (true) {
    case (!email):
      return Errors.fieldsError;
    case (!password):
      return Errors.fieldsError;
    default:
      return false;
  }
};

const getLoginToken = async (email, password) => {
  const validate = validateFields(email, password);
  if (validate) return validate;

  const checkUser = await UsersModel.getByLoginData(email, password);
  if (!checkUser) return Errors.incorrectError;

  const token = jwt.sign({ email, password }, SECRET, jwtConfig);

  return token;
};

module.exports = {
  getLoginToken,
};
