const invalidEntries = {
  status: 400,
  message: 'Invalid entries. Try again.',
};

const emailExists = {
  status: 409,
  message: 'Email already registered',
};

module.exports = {
  invalidEntries,
  emailExists,
};
