const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "sql8.freesqldatabase.com",
  user: "sql8742467",
  database: "sql8742467",
  password: "9m6T2yvyrh",
  /*   host: "localhost",
  user: "root",
  database: "hotels",
  password: "Om@rEssam2003", */
});

module.exports = connection;
