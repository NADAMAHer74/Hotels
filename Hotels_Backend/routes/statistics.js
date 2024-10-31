const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken, checkRole } = require("../middlewares/token");

/**
 * @swagger
 * tags:
 *   name: Statistics
 *   description: API to manage Statistics
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /statistics:
 *   post:
 *     summary: Create a new statistics entry
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Quantity:
 *                 type: integer
 *               visible:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Statistics entry created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/statistics", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { Name, Quantity, visible } = req.body;
  const insertQuery = `INSERT INTO Statistics (Name, Quantity, visible) VALUES (?, ?, ?)`;

  req.pool.query(insertQuery, [Name, Quantity, visible], (error, results) => {
    if (error) {
      console.error("Error inserting statistics entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Statistics entry created successfully" });
  });
});

/**
 * @swagger
 * /statistics:
 *   get:
 *     summary: Get all statistics entries
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: A list of statistics entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Statistics_ID:
 *                     type: integer
 *                   Name:
 *                     type: string
 *                   Quantity:
 *                     type: integer
 *                   visible:
 *                     type: integer
 */
router.get("/statistics", (req, res) => {
  const query = "SELECT * FROM Statistics";

  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching statistics entries:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /statistics/{id}:
 *   get:
 *     summary: Get a statistics entry by ID
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The statistics entry ID
 *     responses:
 *       200:
 *         description: Statistics entry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Statistics_ID:
 *                   type: integer
 *                 Name:
 *                   type: string
 *                 Quantity:
 *                   type: integer
 *                 visible:
 *                   type: integer
 *       404:
 *         description: Statistics entry not found
 */
router.get("/statistics/:id", (req, res) => {
  const query = "SELECT * FROM Statistics WHERE Statistics_ID = ?";

  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching statistics entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Statistics entry not found" });
    }
    res.json(results[0]);
  });
});

/**
 * @swagger
 * /statistics/{id}:
 *   put:
 *     summary: Update a statistics entry by ID
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The statistics entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Quantity:
 *                 type: integer
 *               visible:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Statistics entry updated successfully
 *       404:
 *         description: Statistics entry not found
 */
router.put("/statistics/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { Name, Quantity, visible } = req.body;
  const updateQuery = `UPDATE Statistics SET Name = ?, Quantity = ?, visible = ? WHERE Statistics_ID = ?`;

  req.pool.query(updateQuery, [Name, Quantity, visible, req.params.id], (error, results) => {
    if (error) {
      console.error("Error updating statistics entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Statistics entry not found" });
    }
    res.json({ message: "Statistics entry updated successfully" });
  });
});

/**
 * @swagger
 * /statistics/{id}:
 *   delete:
 *     summary: Delete a statistics entry by ID
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The statistics entry ID
 *     responses:
 *       200:
 *         description: Statistics entry deleted successfully
 *       404:
 *         description: Statistics entry not found
 */
router.delete("/statistics/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const deleteQuery = "DELETE FROM Statistics WHERE Statistics_ID = ?";

  req.pool.query(deleteQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting statistics entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Statistics entry not found" });
    }
    res.json({ message: "Statistics entry deleted successfully" });
  });
});

module.exports = router;
