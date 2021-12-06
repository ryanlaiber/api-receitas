const { getConnection } = require('./connection');

const COLLECTION_NAME = 'users';

const newUser = (name, email, password, role) => ({
    name,
    email,
    password,
    role,
  });

const create = async ({ name, email, password }) => {
  const userCollection = await getConnection().then((db) => db.collection(COLLECTION_NAME));
  const { insertedId } = await userCollection.insertOne(newUser(name, email, password, 'user'));

  return {
    user: {
      name,
      email,
      role: 'user',
      _id: insertedId,
    },
  };
};

const getByEmail = async (email) => {
  const userCollection = await getConnection().then((db) => db.collection(COLLECTION_NAME));
  const user = await userCollection.findOne({ email });

  return user;
};

const getByLoginData = async (email, password) => {
  const userCollection = await getConnection().then((db) => db.collection(COLLECTION_NAME));
  const user = await userCollection.findOne({ email, password });

  return user;
};

module.exports = {
  create,
  getByEmail,
  getByLoginData,
};
