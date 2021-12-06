const invalidEntries = {
  status: 400,
  message: 'Invalid entries. Try again.',
};

const malformedJwt = {
  status: 401,
  message: 'jwt malformed',
};

const notFound = {
  status: 404,
  message: 'recipe not found',
};

const unauthorized = {
  status: 401,
  message: 'this recipe do not belong to you',
};

module.exports = {
  invalidEntries,
  malformedJwt,
  notFound,
  unauthorized,
};
