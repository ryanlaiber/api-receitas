const fieldsError = {
  status: 401,
  message: 'All fields must be filled',
};

const incorrectError = {
  status: 401,
  message: 'Incorrect username or password',
};

module.exports = {
  fieldsError,
  incorrectError,
};
