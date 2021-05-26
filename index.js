const express = require('express');
require('dotenv').config();

const { middlewareError } = require('./src/middlewares');
const {
  routeUser,
  routeCategorie,
  routeBlogPost,
  routePostsCategorie,
} = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('PROJETO BLOG API');
});
app.use(routeUser);
app.use(routeCategorie);
app.use(routeBlogPost);
app.use(routePostsCategorie);
app.use(middlewareError);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
