const RecipesService = require('../services/recipes');
const Errors = require('../helper/recipesErrors');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  if (!userId) {
    return res.status(Errors.malformedJwt.status).json({ message: Errors.malformedJwt.message });
  }

  const result = await RecipesService.create({
    name,
    ingredients,
    preparation,
    userId,
  });

  if (result.status) {
    return res.status(result.status).json({ message: result.message });
  }

  return res.status(201).json(result);
};

const getAll = async (req, res) => {
  const result = await RecipesService.getAll();

  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await RecipesService.getById(id);

  if (result.status) {
    return res.status(result.status).json({ message: result.message });
  }

  return res.status(200).json(result);
};

const updateById = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const { userId, userRole } = req;
  const result = await RecipesService.updateById(
    id,
    { name, ingredients, preparation },
    userId,
    userRole,
  );

  if (result.status) {
    return res.status(result.status).json({ message: result.message });
  }

  return res.status(200).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { userId, userRole } = req;
  await RecipesService.deleteById(id, userId, userRole);
  return res.status(204).end();
};

const updateImageById = async (req, res) => {
  const { id } = req.params;
  const { file, userId, userRole } = req;

  const result = await RecipesService.updateImageById(id, file.filename, userId, userRole);
  if (result.status) {
    return res.status(result.status).json({ message: result.message });
  }

  return res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  updateImageById,
};
