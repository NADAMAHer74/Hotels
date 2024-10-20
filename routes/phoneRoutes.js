const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /phones:
 *   post:
 *     summary: Add a new phone entry
 *     tags: [Phones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:
 *                 type: string
 *               visible:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Phone entry created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/phones", (req, res) => {
  const { phone_number, visible } = req.body;

  const insertQuery = `INSERT INTO phones (phone_number, visible) VALUES (?, ?)`;

  req.pool.query(insertQuery, [phone_number, visible ? 1 : 0], (error, results) => {
    if (error) {
      console.error("Error inserting phone entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Phone entry created successfully" });
  });
});

/**
 * @swagger
 * /phones:
 *   get:
 *     summary: Get all phone entries
 *     tags: [Phones]
 *     responses:
 *       200:
 *         description: A list of phone entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/phones", (req, res) => {
  const query = "SELECT * FROM phones";

  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching phone entries:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /phones/{id}:
 *   get:
 *     summary: Get a phone entry by ID
 *     tags: [Phones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The phone entry ID
 *     responses:
 *       200:
 *         description: Phone entry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Phone entry not found
 */
router.get("/phones/:id", (req, res) => {
  const query = "SELECT * FROM phones WHERE phone_id = ?";

  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching phone entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Phone entry not found" });
    }
    res.json(results[0]);
  });
});

/**
 * @swagger
 * /phones/{id}:
 *   put:
 *     summary: Update a phone entry by ID
 *     tags: [Phones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The phone entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:
 *                 type: string
 *               visible:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Phone entry updated successfully
 *       404:
 *         description: Phone entry not found
 */
router.put("/phones/:id", (req, res) => {
  const { phone_number, visible } = req.body;

  const updateQuery = `UPDATE phones SET phone_number = ?, visible = ? WHERE phone_id = ?`;

  req.pool.query(updateQuery, [phone_number, visible ? 1 : 0, req.params.id], (error, results) => {
    if (error) {
      console.error("Error updating phone entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Phone entry not found" });
    }
    res.json({ message: "Phone entry updated successfully" });
  });
});

/**
 * @swagger
 * /phones/{id}:
 *   delete:
 *     summary: Delete a phone entry by ID
 *     tags: [Phones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The phone entry ID
 *     responses:
 *       200:
 *         description: Phone entry deleted successfully
 *       404:
 *         description: Phone entry not found
 */
router.delete("/phones/:id", (req, res) => {
  const deleteQuery = "DELETE FROM phones WHERE phone_id = ?";

  req.pool.query(deleteQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting phone entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Phone entry not found" });
    }
    res.json({ message: "Phone entry deleted successfully" });
  });
});

module.exports = router;
