var mysql      = require('mysql');

connection = mysql.createConnection({
    host: '1.201.142.243',
    user: 'khuloud',
    port: 3306,
    password: 'password1234',
    database: 'khuloud',
    connectionLimit: 30
  });