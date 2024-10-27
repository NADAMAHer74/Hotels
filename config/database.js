const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7741161",
  database: "sql7741161",
  password: "ykxiIkPIIt",
});

module.exports = connection;
