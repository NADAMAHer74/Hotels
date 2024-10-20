const express = require("express");
const router = express.Router();
const path = require("path");

/**
 * @swagger
 * tags:
 *   name: Destinations
 *   description: API to manage destinations
 */

/**
 * @swagger
 * /destinations:
 *   post:
 *     summary: Create a new destination entry
 *     tags: [Destinations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 description: Local URL of the image
 *               visible:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Destination entry created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/destinations", (req, res) => {
  const { name, category, image, visible } = req.body;

  const insertQuery = `INSERT INTO destinations (name, category, image, visible) VALUES (?, ?, ?, ?)`;
  
  req.pool.query(insertQuery, [name, category, image, visible], (error, results) => {
    if (error) {
      console.error("Error inserting destination entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Destination entry created successfully" });
  });
});

/**
 * @swagger
 * /destinations:
 *   get:
 *     summary: Get all destination entries
 *     tags: [Destinations]
 *     responses:
 *       200:
 *         description: A list of destination entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   destination_id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   category:
 *                     type: string
 *                   image:
 *                     type: string
 *                     description: Local URL of the image
 *                   visible:
 *                     type: integer
 */
router.get("/destinations", (req, res) => {
  const query = "SELECT * FROM destinations";
  
  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching destination entries:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /destinations/{id}:
 *   get:
 *     summary: Get a destination entry by ID
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The destination entry ID
 *     responses:
 *       200:
 *         description: Destination entry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destination_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *                 image:
 *                   type: string
 *                   description: Local URL of the image
 *                 visible:
 *                   type: integer
 *       404:
 *         description: Destination entry not found
 */
router.get("/destinations/:id", (req, res) => {
  const query = "SELECT * FROM destinations WHERE destination_id = ?";
  
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching destination entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Destination entry not found" });
    }
    res.json(results[0]);
  });
});

/**
 * @swagger
 * /destinations/{id}:
 *   put:
 *     summary: Update a destination entry by ID
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The destination entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 description: Local URL of the image
 *               visible:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Destination entry updated successfully
 *       404:
 *         description: Destination entry not found
 */
router.put("/destinations/:id", (req, res) => {
  const { name, category, image, visible } = req.body;
  const updateQuery = `UPDATE destinations SET name = ?, category = ?, image = ?, visible = ? WHERE destination_id = ?`;
  
  req.pool.query(updateQuery, [name, category, image, visible, req.params.id], (error, results) => {
    if (error) {
      console.error("Error updating destination entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Destination entry not found" });
    }
    res.json({ message: "Destination entry updated successfully" });
  });
});

/**
 * @swagger
 * /destinations/{id}:
 *   delete:
 *     summary: Delete a destination entry by ID
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The destination entry ID
 *     responses:
 *       200:
 *         description: Destination entry deleted successfully
 *       404:
 *         description: Destination entry not found
 */
router.delete("/destinations/:id", (req, res) => {
  const deleteQuery = "DELETE FROM destinations WHERE destination_id = ?";
  
  req.pool.query(deleteQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting destination entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Destination entry not found" });
    }
    res.json({ message: "Destination entry deleted successfully" });
  });
});

module.exports = router;
