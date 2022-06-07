require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');
const userMiddleware = require('../middleware/users.js');

router.post('/login', (req, res, next) => {
  if (!req.body.username && !req.body.email) {
    return res.status(401).send({
      msg: 'Please enter username or email!',
    });
  }
  if (req.body.username) {
    db.query(
      `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          return res.status(400).send({
            msg: err,
          });
        }
        if (req.body.username) {
          if (!result.length) {
            return res.status(401).send({
              msg: 'Username/email or password is incorrect!',
            });
          }
        }
        // username is OK
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              return res.status(401).send({
                msg: 'Username/email or password is incorrect!',
              });
            }
            if (bResult) {
              const token = jwt.sign(
                {
                  username: result[0].username,
                  userId: result[0].id,
                },
                process.env.SECRET_KEY,
                {
                  expiresIn: process.env.TOKEN_EXPIRE_TIME,
                }
              );
              db.query(
                `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
              );
              return res.status(200).send({
                msg: 'Logged in!',
                token,
                user: result[0],
              });
            }
            return res.status(401).send({
              msg: 'Username/email or password is incorrect!',
            });
          }
        );
      }
    );
  }
  if (req.body.email) {
    db.query(
      `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          return res.status(400).send({
            msg: err,
          });
        }
        if (req.body.email) {
          if (!result.length) {
            return res.status(401).send({
              msg: 'Username/email or password is incorrect!',
            });
          }
        }
        // email is OK
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              return res.status(401).send({
                msg: 'Username/email or password is incorrect!',
              });
            }
            if (bResult) {
              const token = jwt.sign(
                {
                  username: result[0].username,
                  userId: result[0].id,
                },
                process.env.SECRET_KEY,
                {
                  expiresIn: process.env.TOKEN_EXPIRE_TIME,
                }
              );
              db.query(
                `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
              );
              return res.status(200).send({
                msg: 'Logged in!',
                token,
                user: result[0],
              });
            }
            return res.status(401).send({
              msg: 'Username/email or password is incorrect!',
            });
          }
        );
      }
    );
  }
});

router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(id) = LOWER(${db.escape(
      req.userData.userId
    )})`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          msg: 'Problem retrieving user information',
        });
      } else {
        res.status(200).send(
          `registration time: ${result[0].registered.toLocaleTimeString()} ${result[0].registered.toLocaleDateString()} \n
            username: ${result[0].username}
            `
        );
      }
    }
  );
});

router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
      req.body.username
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'This username or email is already in use!',
        });
      } else {
        // username is available
        db.query(
          `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
            req.body.email
          )});`,
          (err, result) => {
            if (result.length) {
              return res.status(409).send({
                msg: 'This username or email is already in use!',
              });
            } else {
              // email is available
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                  return res.status(500).send({
                    msg: err,
                  });
                } else {
                  // has hashed pw => add to database
                  db.query(
                    `INSERT INTO users (id, username, password, registered, email) VALUES ('${uuid.v4()}', ${db.escape(
                      req.body.username
                    )}, ${db.escape(hash)}, now(), ${db.escape(
                      req.body.email
                    )})`,
                    (err, result) => {
                      if (err) {
                        console.log(err);
                        return res.status(400).send({
                          msg: err,
                        });
                      }
                      return res.status(201).send({
                        msg: 'Registered!',
                      });
                    }
                  );
                }
              });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
