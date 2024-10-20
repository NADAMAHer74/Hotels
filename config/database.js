const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost", // your database host
  user: "root", // your database username
  database: "hotels", // your database name
  password:"Om@rEssam2003",
});

// Establishing the connection
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as id " + connection.threadId);
});

module.exports = connection; // Export the connection
