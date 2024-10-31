const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken, checkRole } = require("../../middlewares/token");

router.get("/admin/aboutus", (req, res) => {
  const query = "SELECT * FROM AboutUs LIMIT 1"; // Only fetch the single row
  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching About Us entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.render("aboutus", { aboutus: results });

    // res.json(results[0]); // Return the single row
  });
});
router.get("/aboutus/:id/edit", async (req, res) => {
  const query = "SELECT * FROM AboutUs LIMIT 1"; // Only fetch the single row
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching about:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "about not found" });
    }
    // res.json(results[0]);
    res.render("editAbout", { about: results[0] });
  });
});

router.put(
  "/admin/aboutus/head",
  verifyToken,
  checkRole(["Admin"]),
  (req, res) => {
    const { head } = req.body;
    const updateQuery = `UPDATE AboutUs SET head = ? WHERE AboutUs_ID = 1`; // Assuming ID 1 for single row
    req.pool.query(updateQuery, [head], (error, results) => {
      if (error) {
        console.error("Error updating About Us head:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "About Us entry not found" });
      }
      res.json({ message: "About Us head updated successfully" });
    });
  }
);

router.put(
  "/admin/aboutus/body",
  verifyToken,
  checkRole(["Admin"]),
  (req, res) => {
    const { Body } = req.body;
    const updateQuery = `UPDATE AboutUs SET Body = ? WHERE AboutUs_ID = 1`; // Assuming ID 1 for single row
    req.pool.query(updateQuery, [Body], (error, results) => {
      if (error) {
        console.error("Error updating About Us body:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "About Us entry not found" });
      }
      res.json({ message: "About Us body updated successfully" });
    });
  }
);

module.exports = router;
