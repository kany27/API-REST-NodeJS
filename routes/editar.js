const express = require('express');
const { route } = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;

router.patch('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if(error) { return res.status(500).send({ error: error });}
    conn.query(
      'UPDATE apiTalble SET usuario = ?, nome = ?, email = ?, senha = ? WHERE id_user = ?',
      [req.body.usuario, req.body.nome, req.body.email, req.body.senha, req.body.id_user],
      (error, resultado, field) => {
        conn.release();
        if(error) {
          return res.status(500).send({
            error: error,
            response: 'Usuário ou senha já existe'
          });
        }
        res.status(202).send({
          message: 'Usuário alterado com sucesso.'
        });
      }
    );
  });
});

module.exports = router;