const UsersModel = require('../models/users');
const Errors = require('../helper/usersErrors');

const validateEntries = (name, email, password) => {
  const emailRegex = /\w+@\w+.com(.br)?/;
  const emailValid = emailRegex.test(email);

  switch (true) {
    case (!name):
      return Errors.invalidEntries;
    case (!email):
      return Errors.invalidEntries;
    case (!password):
      return Errors.invalidEntries;
    case (!emailValid):
      return Errors.invalidEntries;
    default:
      return false;
  }
};

const checkEmail = async (email) => {
  const user = await UsersModel.getByEmail(email);
  return user;
};

const create = async ({ name, email, password }) => {
  const validate = validateEntries(name, email, password);
  if (validate) return validate;
  
  const emailExists = await checkEmail(email);
  if (emailExists) return Errors.emailExists;

  const createReturn = await UsersModel.create({ name, email, password });

  return createReturn;
};

module.exports = {
  create,
};
