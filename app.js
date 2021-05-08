const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaListar = require('./routes/listar');
const rotaCadastro = require('./routes/cadastro');
const rotaEditar = require('./routes/editar');
const rotaDeletar = require('./routes/deletar');
const rotaPerfil = require('./routes/perfil');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Header',
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if(req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).send({});
  }
  next();
});

app.use('/listar', rotaListar);
app.use('/cadastro', rotaCadastro);
app.use('/editar', rotaEditar);
app.use('/deletar', rotaDeletar);
app.use('/perfil', rotaPerfil);

app.use((req, res, next) => {
  const erro = new Error('Não encontrado!');
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message
    }
  })
});

module.exports = app;