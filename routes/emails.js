const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middlewares/token");

/**
 * @swagger
 * tags:
 *   name: Emails
 *   description: API to manage emails
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /emails:
 *   post:
 *     summary: Create a new email entry
 *     tags: [Emails]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               visible:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Email entry created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/emails", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { email, visible } = req.body;
  const insertQuery = `INSERT INTO emails (email, visible) VALUES (?, ?)`;
  
  req.pool.query(insertQuery, [email, visible], (error, results) => {
    if (error) {
      console.error("Error inserting email entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Email entry created successfully" });
  });
});

/**
 * @swagger
 * /emails:
 *   get:
 *     summary: Get all email entries
 *     tags: [Emails]
 *     responses:
 *       200:
 *         description: A list of email entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email_id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   visible:
 *                     type: integer
 */
router.get("/emails", (req, res) => {
  const query = "SELECT * FROM emails";
  
  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching email entries:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /emails/{id}:
 *   get:
 *     summary: Get an email entry by ID
 *     tags: [Emails]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The email entry ID
 *     responses:
 *       200:
 *         description: Email entry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email_id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 visible:
 *                   type: integer
 *       404:
 *         description: Email entry not found
 */
router.get("/emails/:id", (req, res) => {
  const query = "SELECT * FROM emails WHERE email_id = ?";
  
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching email entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Email entry not found" });
    }
    res.json(results[0]);
  });
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /emails/{id}:
 *   put:
 *     summary: Update an email entry by ID
 *     tags: [Emails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The email entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               visible:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Email entry updated successfully
 *       404:
 *         description: Email entry not found
 */
router.put("/emails/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { email, visible } = req.body;
  const updateQuery = `UPDATE emails SET email = ?, visible = ? WHERE email_id = ?`;
  
  req.pool.query(updateQuery, [email, visible, req.params.id], (error, results) => {
    if (error) {
      console.error("Error updating email entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Email entry not found" });
    }
    res.json({ message: "Email entry updated successfully" });
  });
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /emails/{id}:
 *   delete:
 *     summary: Delete an email entry by ID
 *     tags: [Emails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The email entry ID
 *     responses:
 *       200:
 *         description: Email entry deleted successfully
 *       404:
 *         description: Email entry not found
 */
router.delete("/emails/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const deleteQuery = "DELETE FROM emails WHERE email_id = ?";
  
  req.pool.query(deleteQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting email entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Email entry not found" });
    }
    res.json({ message: "Email entry deleted successfully" });
  });
});

module.exports = router;
