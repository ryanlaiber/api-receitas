const UsersService = require('../services/users');

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const result = await UsersService.create({ name, email, password });

  if (result.status) {
    return res.status(result.status).json({ message: result.message });
  }

  return res.status(201).json(result);
};

module.exports = {
  create,
};
