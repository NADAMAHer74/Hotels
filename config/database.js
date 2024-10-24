const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "hotels",
  password: "Om@rEssam2003",
});

module.exports = connection;