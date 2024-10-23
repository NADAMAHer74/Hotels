const mysql = require("mysql");

const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "Hotels",
});

module.exports = pool;
