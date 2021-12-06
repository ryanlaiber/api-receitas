const RecipesModel = require('../models/recipes');
const Errors = require('../helper/recipesErrors');

const validateEntries = (name, ingredients, preparation) => {
  switch (true) {
    case (!name):
      return Errors.invalidEntries;
    case (!ingredients):
      return Errors.invalidEntries;
    case (!preparation):
      return Errors.invalidEntries;
    default:
      return false;
  }
};

const create = async ({ name, ingredients, preparation, userId }) => {
  const validate = validateEntries(name, ingredients, preparation);
  if (validate) return validate;

  const createdRecipe = await RecipesModel.create({ name, ingredients, preparation, userId });

  return createdRecipe;
};

const getAll = async () => {
  const allRecipes = await RecipesModel.getAll();
  return allRecipes;
};

const getById = async (id) => {
  const recipe = await RecipesModel.getById(id);

  if (recipe) return recipe;

  return Errors.notFound;
};

const updateById = async (id, { name, ingredients, preparation }, curUserId, curUserRole) => {
  const validate = validateEntries(name, ingredients, preparation);
  if (validate) return validate;
  const recipe = await RecipesModel.getById(id);
  if (recipe && (curUserId.toString() === recipe.userId.toString() || curUserRole === 'admin')) {
      const updatedRecipe = await RecipesModel.updateById(id, name, ingredients, preparation);
      return updatedRecipe;
  }

  return Errors.malformedJwt;
};

const deleteById = async (id, curUserId, curUserRole) => {
  const recipe = await RecipesModel.getById(id);
  if (recipe && (curUserId.toString() === recipe.userId.toString() || curUserRole === 'admin')) {
    await RecipesModel.deleteById(id);
  }
};

const updateImageById = async (id, image, curUserId, curUserRole) => {
  const fileUrl = `localhost:3000/src/uploads/${image}`;
  const recipe = await RecipesModel.getById(id);
  if (recipe && (curUserId.toString() === recipe.userId.toString() || curUserRole === 'admin')) {
    const updatedRecipe = await RecipesModel.updateImageById(id, fileUrl);
    return updatedRecipe;
  }

  return Errors.malformedJwt;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  updateImageById,
};
