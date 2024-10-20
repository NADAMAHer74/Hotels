const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = "your_jwt_secret_key"; // Replace with your secret key

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user (Signup)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 */
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, phone, password, role } = req.body;

  try {
    console.log("Received signup request:", req.body);

    const existingUserQuery = "SELECT * FROM users WHERE email = ?";
    req.pool.query(existingUserQuery, [email], async (error, results) => {
      if (error) {
        console.error("Error checking existing user:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUserQuery =
        "INSERT INTO users (firstName, lastName, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)";
      req.pool.query(
        insertUserQuery,
        [firstName, lastName, email, phone, hashedPassword, role || "User"],
        (error, results) => {
          if (error) {
            console.error("Error inserting user:", error);
            return res.status(500).json({ message: "Internal server error" });
          }
          res.status(201).json({ message: "User created successfully" });
        }
      );
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: User not found
 */
router.get("/users/:id", (req, res) => {
  const query = "SELECT * FROM users WHERE id = ?";
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(results[0]);
  });
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/users/:id", (req, res) => {
  const query = "DELETE FROM users WHERE id = ?";
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  });
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/users/:id", (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    // Create an array to hold the updates
    const updates = [];
    const updateFields = [];

    if (firstName) {
      updates.push(firstName);
      updateFields.push("firstName = ?");
    }
    if (lastName) {
      updates.push(lastName);
      updateFields.push("lastName = ?");
    }
    if (email) {
      updates.push(email);
      updateFields.push("email = ?");
    }
    if (phone) {
      updates.push(phone);
      updateFields.push("phone = ?");
    }
    if (password) {
      // Hash the password if provided
      bcrypt.hash(password, 10).then((hashedPassword) => {
        updates.push(hashedPassword);
        updateFields.push("password = ?");
        updateUser();
      });
    } else {
      updateUser();
    }

    function updateUser() {
      // If no updates were provided, return a 400 error
      if (updates.length === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }

      const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
      updates.push(req.params.id); // Add user ID to updates

      req.pool.query(query, updates, (error, results) => {
        if (error) {
          console.error("Error updating user:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully" });
      });
    }
  } catch (error) {
    console.error("Invalid JSON format:", error);
    return res.status(400).json({ message: "Invalid JSON format" });
  }
});

module.exports = router;
