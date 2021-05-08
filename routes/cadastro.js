const express = require('express');
const { route } = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;

router.post('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if(error) {
      return res.status(500).send({ erro: error });
    }
    if(req.body.senha.length < 6) {
      return res.status(500).send({
        error: error,
        response: 'Insira uma senha de no mínimo 6 caracteres!'
      });
    }
    conn.query(
      'INSERT INTO apiTable (usuario, nome, email, senha) VALUES (?, ?, ?, ?)',
      [req.body.usuario, req.body.nome, req.body.email, req.body.senha],
      (error, resultado, field) => {
        conn.release();
        if(error) {
          return res.status(500).send({
            error: error,
            response: 'Usuário ou senha já existe!'
          });
        }
        res.status(201).send({
          message: 'Usuário cadastrado com sucesso!!',
          id_user: resultado.insertId
        });
      }
    )
  });
});

module.exports = router;