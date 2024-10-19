const express = require("express");
const connection = require("./config/database"); // Import your database connection

const app = express();
app.use(express.json());

// Check database connection once when the server starts
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database...");

  // Start the server after a successful database connection
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });

  // Route to get all users
  app.get("/users", (req, res) => {
    const query = "SELECT * FROM users"; // SQL query to fetch all users

    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      res.json(results); // Send the results as a JSON response
    });
  });
});
