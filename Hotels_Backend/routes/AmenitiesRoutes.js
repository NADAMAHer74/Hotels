express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken, checkRole } = require("../middlewares/token");

/**
 * @swagger
 *   components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /amenities:
 *   post:
 *     summary: Add a new amenity
 *     tags: [Amenities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               icon:
 *                 type: string
 *               rate:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Amenity created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/amenities", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { name, icon, rate } = req.body;
  const insertQuery = `INSERT INTO amenities (name, icon, rate) VALUES (?, ?, ?)`;

  req.pool.query(insertQuery, [name, icon, rate], (error, results) => {
    if (error) {
      console.error("Error inserting amenity:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Amenity created successfully" });
  });
});

/**
 * @swagger
 * /amenities:
 *   get:
 *     summary: Get all amenities
 *     tags: [Amenities]
 *     responses:
 *       200:
 *         description: A list of amenities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/amenities", (req, res) => {
  const query = "SELECT * FROM amenities";

  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching amenities:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /amenities/{id}:
 *   get:
 *     summary: Get an amenity by ID
 *     tags: [Amenities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The amenity ID
 *     responses:
 *       200:
 *         description: Amenity details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Amenity not found
 */
router.get("/amenities/:id", (req, res) => {
  const query = "SELECT * FROM amenities WHERE amenities_id = ?";

  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching amenity:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Amenity not found" });
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
 * /amenities/{id}:
 *   put:
 *     summary: Update an amenity by ID
 *     tags: [Amenities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The amenity ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               icon:
 *                 type: string
 *               rate:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Amenity updated successfully
 *       404:
 *         description: Amenity not found
 */
router.put("/amenities/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { name, icon, rate } = req.body;
  const updateQuery = `UPDATE amenities SET name = ?, icon = ?, rate = ? WHERE amenities_id = ?`;

  req.pool.query(updateQuery, [name, icon, rate, req.params.id], (error, results) => {
    if (error) {
      console.error("Error updating amenity:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Amenity not found" });
    }
    res.json({ message: "Amenity updated successfully" });
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
 * /amenities/{id}:
 *   delete:
 *     summary: Delete an amenity by ID
 *     tags: [Amenities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The amenity ID
 *     responses:
 *       200:
 *         description: Amenity deleted successfully
 *       404:
 *         description: Amenity not found
 */
router.delete("/amenities/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const deleteQuery = "DELETE FROM amenities WHERE amenities_id = ?";

  req.pool.query(deleteQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting amenity:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Amenity not found" });
    }
    res.json({ message: "Amenity deleted successfully" });
  });
});

module.exports = router;
