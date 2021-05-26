const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('PROJETO BLOG API');
});

app.use((err, _req, res, _next) => {
  const { status, message } = err;
  res.status(status).json({
    message,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
