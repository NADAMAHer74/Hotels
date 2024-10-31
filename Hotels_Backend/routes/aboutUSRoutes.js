const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken, checkRole } = require("../middlewares/token");

/**
 * @swagger
 * tags:
 *   name: About Us
 *   description: API to manage About Us information
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /aboutus:
 *   get:
 *     summary: Get the About Us entry
 *     tags: [About Us]
 *     responses:
 *       200:
 *         description: The About Us entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 AboutUs_ID:
 *                   type: integer
 *                 head:
 *                   type: string
 *                 Body:
 *                   type: string
 */
router.get("/aboutus", (req, res) => {
  const query = "SELECT * FROM AboutUs LIMIT 1"; // Only fetch the single row
  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching About Us entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    //res.render("aboutus", { aboutus: results, aboutusImages: results[0] });

    res.json(results[0]); // Return the single row
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
    res.json(results[0]);
    //res.render("editAbout", { about: results[0] });
  });
});

/**
 * @swagger
 * /aboutus/head:
 *   put:
 *     summary: Update the head of the About Us entry
 *     tags: [About Us]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               head:
 *                 type: string
 *     responses:
 *       200:
 *         description: About Us head updated successfully
 */
router.put("/aboutus/head", verifyToken, checkRole(["Admin"]), (req, res) => {
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
});

/**
 * @swagger
 * /aboutus/body:
 *   put:
 *     summary: Update the body of the About Us entry
 *     tags: [About Us]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Body:
 *                 type: string
 *     responses:
 *       200:
 *         description: About Us body updated successfully
 */
router.put("/aboutus/body", verifyToken, checkRole(["Admin"]), (req, res) => {
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
});

module.exports = router;
