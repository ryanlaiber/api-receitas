const express = require('express');
const path = require('path');
const UserRouter = require('./routes/users');
const LoginRouter = require('./routes/login');
const RecipeRouter = require('./routes/recipes');

const app = express();
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../uploads')));

app.use('/users', UserRouter);
app.use('/login', LoginRouter);
app.use('/recipes', RecipeRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
