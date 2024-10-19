const express = require("express");
const connection = require("../config/database");
const router = express.Router();

// Example route for getting all users
router.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
