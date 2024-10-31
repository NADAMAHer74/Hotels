const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken, checkRole } = require("../middlewares/token");

/**
 * @swagger
 * tags:
 *   name: What To Do
 *   description: API to manage What To Do information
 */

/**
 * @swagger
 * /whattodo:
 *   get:
 *     summary: Get the What To Do entry
 *     tags: [What To Do]
 *     responses:
 *       200:
 *         description: The What To Do entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 WhatToDo_ID:
 *                   type: integer
 *                 Head:
 *                   type: string
 *                 Body:
 *                   type: string
 */
router.get("/whattodo", (req, res) => {
  const query = "SELECT * FROM WhatToDo LIMIT 1"; // Fetch the single row
  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching What To Do entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results[0]); // Return the single row
  });
});

/**
 * @swagger
 * /whattodo/head:
 *   put:
 *     summary: Update the head of the What To Do entry
 *     tags: [What To Do]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Head:
 *                 type: string
 *     responses:
 *       200:
 *         description: What To Do head updated successfully
 */
router.put("/whattodo/head", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { Head } = req.body;
  const updateQuery = `UPDATE WhatToDo SET Head = ? WHERE WhatToDo_ID = 1`; // Assuming ID 1 for single row
  req.pool.query(updateQuery, [Head], (error, results) => {
    if (error) {
      console.error("Error updating What To Do head:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "What To Do entry not found" });
    }
    res.json({ message: "What To Do head updated successfully" });
  });
});

/**
 * @swagger
 * /whattodo/body:
 *   put:
 *     summary: Update the body of the What To Do entry
 *     tags: [What To Do]
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
 *         description: What To Do body updated successfully
 */
router.put("/whattodo/body", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { Body } = req.body;
  const updateQuery = `UPDATE WhatToDo SET Body = ? WHERE WhatToDo_ID = 1`; // Assuming ID 1 for single row
  req.pool.query(updateQuery, [Body], (error, results) => {
    if (error) {
      console.error("Error updating What To Do body:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "What To Do entry not found" });
    }
    res.json({ message: "What To Do body updated successfully" });
  });
});

module.exports = router;
