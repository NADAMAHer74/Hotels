const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: WorkingHours
 *   description: API to manage working hours
 */

/**
 * @swagger
 * /workinghours:
 *   post:
 *     summary: Create a new working hours entry
 *     tags: [WorkingHours]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_day:
 *                 type: string
 *               end_day:
 *                 type: string
 *               start_hour:
 *                 type: string
 *               end_hour:
 *                 type: string
 *               visible:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Working hours entry created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/workinghours", (req, res) => {
  const { start_day, end_day, start_hour, end_hour, visible } = req.body;
  const insertQuery = `INSERT INTO working_hours (start_day, end_day, start_hour, end_hour, visible) VALUES (?, ?, ?, ?, ?)`;
  
  req.pool.query(insertQuery, [start_day, end_day, start_hour, end_hour, visible], (error, results) => {
    if (error) {
      console.error("Error inserting working hours entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Working hours entry created successfully" });
  });
});

/**
 * @swagger
 * /workinghours:
 *   get:
 *     summary: Get all working hours entries
 *     tags: [WorkingHours]
 *     responses:
 *       200:
 *         description: A list of working hours entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   working_hours_id:
 *                     type: integer
 *                   start_day:
 *                     type: string
 *                   end_day:
 *                     type: string
 *                   start_hour:
 *                     type: string
 *                   end_hour:
 *                     type: string
 *                   visible:
 *                     type: integer
 */
router.get("/workinghours", (req, res) => {
  const query = "SELECT * FROM working_hours";
  
  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching working hours entries:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /workinghours/{id}:
 *   get:
 *     summary: Get a working hours entry by ID
 *     tags: [WorkingHours]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The working hours entry ID
 *     responses:
 *       200:
 *         description: Working hours entry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 working_hours_id:
 *                   type: integer
 *                 start_day:
 *                   type: string
 *                 end_day:
 *                   type: string
 *                 start_hour:
 *                   type: string
 *                 end_hour:
 *                   type: string
 *                 visible:
 *                   type: integer
 *       404:
 *         description: Working hours entry not found
 */
router.get("/workinghours/:id", (req, res) => {
  const query = "SELECT * FROM working_hours WHERE working_hours_id = ?";
  
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching working hours entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Working hours entry not found" });
    }
    res.json(results[0]);
  });
});

/**
 * @swagger
 * /workinghours/{id}:
 *   put:
 *     summary: Update a working hours entry by ID
 *     tags: [WorkingHours]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The working hours entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_day:
 *                 type: string
 *               end_day:
 *                 type: string
 *               start_hour:
 *                 type: string
 *               end_hour:
 *                 type: string
 *               visible:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Working hours entry updated successfully
 *       404:
 *         description: Working hours entry not found
 */
router.put("/workinghours/:id", (req, res) => {
  const { start_day, end_day, start_hour, end_hour, visible } = req.body;
  const updateQuery = `UPDATE working_hours SET start_day = ?, end_day = ?, start_hour = ?, end_hour = ?, visible = ? WHERE working_hours_id = ?`;
  
  req.pool.query(updateQuery, [start_day, end_day, start_hour, end_hour, visible, req.params.id], (error, results) => {
    if (error) {
      console.error("Error updating working hours entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Working hours entry not found" });
    }
    res.json({ message: "Working hours entry updated successfully" });
  });
});

/**
 * @swagger
 * /workinghours/{id}:
 *   delete:
 *     summary: Delete a working hours entry by ID
 *     tags: [WorkingHours]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The working hours entry ID
 *     responses:
 *       200:
 *         description: Working hours entry deleted successfully
 *       404:
 *         description: Working hours entry not found
 */
router.delete("/workinghours/:id", (req, res) => {
  const deleteQuery = "DELETE FROM working_hours WHERE working_hours_id = ?";
  
  req.pool.query(deleteQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting working hours entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Working hours entry not found" });
    }
    res.json({ message: "Working hours entry deleted successfully" });
  });
});

module.exports = router;
