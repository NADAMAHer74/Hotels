const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken, checkRole } = require("../middlewares/token");

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: API to manage locations
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /locations:
 *   post:
 *     summary: Create a new location entry
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *               visible:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Location entry created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/locations",verifyToken, checkRole(["Admin"]), (req, res) => {
  const { location, visible } = req.body;
  const insertQuery = `INSERT INTO locations (location, visible) VALUES (?, ?)`;
  
  req.pool.query(insertQuery, [location, visible], (error, results) => {
    if (error) {
      console.error("Error inserting location entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Location entry created successfully" });
  });
});

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Get all location entries
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: A list of location entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   location_id:
 *                     type: integer
 *                   location:
 *                     type: string
 *                   visible:
 *                     type: integer
 */
router.get("/locations", (req, res) => {
  const query = "SELECT * FROM locations";
  
  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching location entries:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     summary: Get a location entry by ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The location entry ID
 *     responses:
 *       200:
 *         description: Location entry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 location_id:
 *                   type: integer
 *                 location:
 *                   type: string
 *                 visible:
 *                   type: integer
 *       404:
 *         description: Location entry not found
 */
router.get("/locations/:id", (req, res) => {
  const query = "SELECT * FROM locations WHERE location_id = ?";
  
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching location entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Location entry not found" });
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
 * /locations/{id}:
 *   put:
 *     summary: Update a location entry by ID
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The location entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *               visible:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Location entry updated successfully
 *       404:
 *         description: Location entry not found
 */
router.put("/locations/:id",verifyToken, checkRole(["Admin"]), (req, res) => {
  const { location, visible } = req.body;
  const updateQuery = `UPDATE locations SET location = ?, visible = ? WHERE location_id = ?`;
  
  req.pool.query(updateQuery, [location, visible, req.params.id], (error, results) => {
    if (error) {
      console.error("Error updating location entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Location entry not found" });
    }
    res.json({ message: "Location entry updated successfully" });
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
 * /locations/{id}:
 *   delete:
 *     summary: Delete a location entry by ID
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The location entry ID
 *     responses:
 *       200:
 *         description: Location entry deleted successfully
 *       404:
 *         description: Location entry not found
 */
router.delete("/locations/:id",verifyToken, checkRole(["Admin"]), (req, res) => {
  const deleteQuery = "DELETE FROM locations WHERE location_id = ?";
  
  req.pool.query(deleteQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting location entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Location entry not found" });
    }
    res.json({ message: "Location entry deleted successfully" });
  });
});

module.exports = router;
