const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = "your_jwt_secret_key";


/* router.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    role = "User",
  } = req.body;

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
        [firstName, lastName, email, phone, hashedPassword, role],
        (error, results) => {
          if (error) {
            console.error("Error inserting user:", error);
            return res.status(500).json({ message: "Internal server error" });
          }

          const token = jwt.sign(
            { userId: results.insertId, role },
            JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );

          const userData = {
            id: results.insertId,
            firstName,
            lastName,
            email,
            phone,
            role,
          };

          res.status(201).json({
            message: "User created successfully",
            user: userData,
            token,
          });
        }
      );
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}); */


router.post("/admin/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received signin request:", req.body);

  try {
    const query = "SELECT * FROM users WHERE email = ? AND role='Admin'";
    req.pool.query(query, [email], async (error, results) => {
      if (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = results[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });

      const userData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role || "User",
      };

      // res.status(200).json({
      //   message: "User authenticated successfully",
      //   user: userData,
      //   token,
      // });
      res.cookie("token", token, {
        httpOnly: true, // JavaScript cannot access this cookie on the client side
        secure: process.env.NODE_ENV === "production", // Cookie is sent only over HTTPS in production
        sameSite: "Strict", // CSRF protection
        maxAge: 3600000, // Expiration time in milliseconds (1 hour)
      });

      // res.status(200).json({
      //   message: "User authenticated successfully",
      //   user: userData,
      // });
      res.header("token", token).redirect("/api/admin/tours");
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received signin request:", req.body);

  try {
    const query = "SELECT * FROM users WHERE email = ? AND role='user'";
    req.pool.query(query, [email], async (error, results) => {
      if (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });

      const userData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role || "User",
      };

      // res.status(200).json({
      //   message: "User authenticated successfully",
      //   user: userData,
      //   token,
      // });
      res.cookie("token", token, {
        httpOnly: true, // JavaScript cannot access this cookie on the client side
        secure: process.env.NODE_ENV === "production", // Cookie is sent only over HTTPS in production
        sameSite: "Strict", // CSRF protection
        maxAge: 3600000, // Expiration time in milliseconds (1 hour)
      });

      // res.status(200).json({
      //   message: "User authenticated successfully",
      //   user: userData,
      // });
      res.header("token", token).redirect("/api/tours");
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}); */




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


/* router.delete("/users/:id", (req, res) => {
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
}); */


/* router.put("/users/:id", (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

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
      bcrypt.hash(password, 10).then((hashedPassword) => {
        updates.push(hashedPassword);
        updateFields.push("password = ?");
        updateUser();
      });
    } else {
      updateUser();
    }

    function updateUser() {
      if (updates.length === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }

      const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
      updates.push(req.params.id);

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
}); */

module.exports = router;
