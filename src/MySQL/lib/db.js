const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'usersManager',
  database: 'users',
  password: 'node-jwt',
});

connection.connect();
module.exports = connection;
