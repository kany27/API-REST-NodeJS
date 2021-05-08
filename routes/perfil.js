const express = require('express');
const { route } = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/:id_user', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if(error){ return res.status(500).send({ error: error })}
    conn.query(
      'SELECT usuario, nome, email FROM apiTable WHERE id_user = ?;'
      [req.params.id_user],
      (error, resultado, field) => {
        if(error){ return res.status(500).send({ error: error })}
        return res.status(200).send({ response: resultado })
      }
    )
  });
});

module.exports = router;