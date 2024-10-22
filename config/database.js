const mysql = require("mysql2/promise");

const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "Hotels",
});

module.exports = pool;
