const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = "your_jwt_secret_key";

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

module.exports = router;
