const LoginService = require('../services/login');

const getLoginToken = async (req, res) => {
  const { email, password } = req.body;

  const result = await LoginService.getLoginToken(email, password);

  if (result.status) {
    return res.status(result.status).json({ message: result.message });
  }

  return res.status(200).json({ token: result });
};

module.exports = {
  getLoginToken,
};
