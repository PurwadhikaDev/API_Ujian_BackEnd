const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'saitama',
  password : 'abc123',
  database : 'tokokasih',
  port     : 3306
});

module.exports = {
    sqlDB : connection
}