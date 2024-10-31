const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7741161",
  database: "sql7741161",
  password: "ykxiIkPIIt", 
/*   host: "localhost",
  user: "root",
  database: "hotels",
  password: "Om@rEssam2003", */

});

module.exports = connection;
