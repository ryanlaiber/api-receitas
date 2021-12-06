# api-receitas

Projeto de construção de API RESTFUL que interage com o banco de dados MongoDB e realiza o CRUD de de "recipes" e "users".
Neste projeto foram desenvolvidas requisições com autenticação, onde é necessário um token válido para que elas sejam executadas.
Para gerar um token de autenticação válido é necessário realizar receber o token retornado pela requisição de "login" com um usuário 
cadastrado pela requisição .post "/users".

# Tecnologias utilizadas

- node.js
- express
- mongodb
- jasonwebtoken (JWT)
- multer

# Paths da Aplicação

<strong>users/</strong>
  - .post('/') cria user.
  
<strong>login/</strong>
  - .post('/') loga usuário e recebe token de validação.

<strong>recipes/</strong>
  - .post('/') cria recipe.
  - .get('/') recebe todos recipes.
  - .get('/:id') recebe recipe pelo ID.
  - .put('/:id')  atualiza recipe pelo ID.
  - .delete('/:id') deleta recipe pelo ID.
  - .put('/:id/image') faz upload de imagem para o recipe.
