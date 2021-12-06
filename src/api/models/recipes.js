const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const COLLECTION_NAME = 'recipes';

const newRecipe = ({ id, name, preparation, ingredients, userId }) => ({
    _id: id,
    name,
    preparation,
    ingredients,
    userId,
});

const create = async ({ name, ingredients, preparation, userId }) => {
  const recipesCollection = await getConnection().then((db) => db.collection(COLLECTION_NAME));

  const { insertedId } = await recipesCollection.insertOne({
    name,
    ingredients,
    preparation,
    userId,
  });

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: insertedId,
    },
  };
};

const getAll = async () => {
  const recipesCollection = await getConnection().then((db) => db.collection(COLLECTION_NAME));
  const recipesList = await recipesCollection.find().toArray();

  return recipesList;
};

const getById = async (id) => {
  const recipesCollection = await getConnection().then((db) => db.collection(COLLECTION_NAME));
  let objectfyId = id;
  const validId = ObjectId.isValid(id);
  if (validId) {
    objectfyId = new ObjectId(id);
  }

  const recipe = await recipesCollection.findOne({ _id: objectfyId });

  return recipe;
};

const updateById = async (id, name, ingredients, preparation) => {
  const recipesCollection = await getConnection().then((db) => db.collection(COLLECTION_NAME));
  let objectfyId = id;
  const validId = ObjectId.isValid(id);
  if (validId) {
    objectfyId = new ObjectId(id);
  }

  const { value: { userId } } = await recipesCollection.findOneAndUpdate({ _id: objectfyId }, {
    $set: {
      name,
      ingredients,
      preparation,
    },
  });

  return newRecipe({ id: objectfyId, name, ingredients, preparation, userId });
};

const deleteById = async (id) => {
  const recipesCollection = await getConnection().then((db) => db.collection(COLLECTION_NAME));
  let objectfyId = id;
  const validId = ObjectId.isValid(id);
  if (validId) {
    objectfyId = new ObjectId(id);
  }
  await recipesCollection.deleteOne({ _id: objectfyId });
};

const updateImageById = async (id, image) => {
  const recipesCollection = await getConnection().then((db) => db.collection(COLLECTION_NAME));
  let objectfyId = id;
  const validId = ObjectId.isValid(id);
  if (validId) {
    objectfyId = new ObjectId(id);
  }
  const { value: { _id, name, ingredients, preparation, userId } } = await recipesCollection
    .findOneAndUpdate({ _id: objectfyId }, { $set: { image } });
  
  return {
    _id,
    name,
    ingredients,
    preparation,
    userId,
    image,
  };
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  updateImageById,
};
