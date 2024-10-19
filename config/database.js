const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost", // your database host
  user: "root", // your database username
  database: "Hotels", // your database name
});

module.exports = connection; // Export the connection
