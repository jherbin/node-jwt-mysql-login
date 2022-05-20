import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'node-jwt',
  database: 'MySQLService',
  password: 'node-jwt',
});

connection.connect();
module.exports = connection;
