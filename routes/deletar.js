const express = require('express');
const { route } = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;

router.delete('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if(error) { return res.status(500).send({ error: error });}
    conn.query(
      'UPDATE apiTable SET isDeleted = 1 WHERE id_user = ?',
      [req.body.id_user],
      (error, resultado, field) => {
        conn.release();
        if(error) {
          return res.status(500).send({
            error: error,
            response: null
          });
        }
        res.status(202).send({
          message: 'Usuário removido com sucesso'
        });
      }
    )
  });
});