const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middlewares/token");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tours_has_amenities:
 *   post:
 *     summary: Add a new relation between a tour and an amenity
 *     tags: [ToursHasAmenities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tours_tour_id:
 *                 type: integer
 *               amenities_amenities_id:
 *                 type: integer
 *               available:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Relation created successfully
 *       404:
 *         description: Tour or Amenity not found
 *       500:
 *         description: Internal server error
 */
router.post("/tours_has_amenities", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { tours_tour_id, amenities_amenities_id, available } = req.body;

  // First, check if both tour and amenity exist
  const checkQuery = `
    SELECT 
      (SELECT COUNT(*) FROM tours WHERE tour_id = ?) AS tourExists,
      (SELECT COUNT(*) FROM amenities WHERE amenities_id = ?) AS amenityExists
  `;

  req.pool.query(checkQuery, [tours_tour_id, amenities_amenities_id], (error, results) => {
    if (error) {
      console.error("Error checking tour and amenity:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    const tourExists = results[0].tourExists;
    const amenityExists = results[0].amenityExists;

    if (!tourExists || !amenityExists) {
      return res.status(404).json({ message: "Tour or Amenity not found" });
    }

    // Insert the new record into tours_has_amenities
    const insertQuery = `
      INSERT INTO tours_has_amenities (tours_tour_id, amenities_amenities_id, available)
      VALUES (?, ?, ?)
    `;

    req.pool.query(insertQuery, [tours_tour_id, amenities_amenities_id, available ? 1 : 0], (error, results) => {
      if (error) {
        console.error("Error inserting relation:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(201).json({ message: "Relation created successfully" });
    });
  });
});

/**
 * @swagger
 * /tours_has_amenities:
 *   get:
 *     summary: Get all relations between tours and amenities
 *     tags: [ToursHasAmenities]
 *     responses:
 *       200:
 *         description: List of all relations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   tours_tour_id:
 *                     type: integer
 *                   amenities_amenities_id:
 *                     type: integer
 *                   available:
 *                     type: boolean
 *                   tour_name:
 *                     type: string
 *                   amenity_name:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get("/tours_has_amenities", (req, res) => {
    const getQuery = `
      SELECT tha.tours_tour_id, tha.amenities_amenities_id, tha.available, t.name AS tour_name, a.name AS amenity_name
      FROM tours_has_amenities tha
      INNER JOIN tours t ON tha.tours_tour_id = t.tour_id
      INNER JOIN amenities a ON tha.amenities_amenities_id = a.amenities_id
    `;
  
    req.pool.query(getQuery, (error, results) => {
      if (error) {
        console.error("Error fetching relations:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
  
      res.status(200).json(results);
    });
  });
  
  /**
   * @swagger
   * /tours_has_amenities/{tours_tour_id}/{amenities_amenities_id}:
   *   get:
   *     summary: Get a relation between a specific tour and amenity by their IDs
   *     tags: [ToursHasAmenities]
   *     parameters:
   *       - in: path
   *         name: tours_tour_id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The tour ID
   *       - in: path
   *         name: amenities_amenities_id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The amenity ID
   *     responses:
   *       200:
   *         description: Relation found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 tours_tour_id:
   *                   type: integer
   *                 amenities_amenities_id:
   *                   type: integer
   *                 available:
   *                   type: boolean
   *                 tour_name:
   *                   type: string
   *                 amenity_name:
   *                   type: string
   *       404:
   *         description: Relation not found
   *       500:
   *         description: Internal server error
   */
  router.get("/tours_has_amenities/:tours_tour_id/:amenities_amenities_id", (req, res) => {
    const { tours_tour_id, amenities_amenities_id } = req.params;
  
    const getByIdQuery = `
      SELECT tha.tours_tour_id, tha.amenities_amenities_id, tha.available, t.name AS tour_name, a.name AS amenity_name
      FROM tours_has_amenities tha
      INNER JOIN tours t ON tha.tours_tour_id = t.tour_id
      INNER JOIN amenities a ON tha.amenities_amenities_id = a.amenities_id
      WHERE tha.tours_tour_id = ? AND tha.amenities_amenities_id = ?
    `;
  
    req.pool.query(getByIdQuery, [tours_tour_id, amenities_amenities_id], (error, results) => {
      if (error) {
        console.error("Error fetching relation:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: "Relation not found" });
      }
  
      res.status(200).json(results[0]);
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
 * /tours_has_amenities/{tours_tour_id}/{amenities_amenities_id}:
 *   put:
 *     summary: Update relation by tour and amenity IDs
 *     tags: [ToursHasAmenities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tours_tour_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The tour ID
 *       - in: path
 *         name: amenities_amenities_id
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
 *               available:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Relation updated successfully
 *       404:
 *         description: Relation not found
 *       500:
 *         description: Internal server error
 */
router.put("/tours_has_amenities/:tours_tour_id/:amenities_amenities_id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { available } = req.body;
  const { tours_tour_id, amenities_amenities_id } = req.params;

  const updateQuery = `
    UPDATE tours_has_amenities 
    SET available = ? 
    WHERE tours_tour_id = ? AND amenities_amenities_id = ?
  `;

  req.pool.query(updateQuery, [available ? 1 : 0, tours_tour_id, amenities_amenities_id], (error, results) => {
    if (error) {
      console.error("Error updating relation:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Relation not found" });
    }

    res.json({ message: "Relation updated successfully" });
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
 * /tours_has_amenities/{tours_tour_id}/{amenities_amenities_id}:
 *   delete:
 *     summary: Delete a relation by tour and amenity IDs
 *     tags: [ToursHasAmenities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tours_tour_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The tour ID
 *       - in: path
 *         name: amenities_amenities_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The amenity ID
 *     responses:
 *       200:
 *         description: Relation deleted successfully
 *       404:
 *         description: Relation not found
 *       500:
 *         description: Internal server error
 */
router.delete("/tours_has_amenities/:tours_tour_id/:amenities_amenities_id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { tours_tour_id, amenities_amenities_id } = req.params;

  const deleteQuery = `
    DELETE FROM tours_has_amenities 
    WHERE tours_tour_id = ? AND amenities_amenities_id = ?
  `;

  req.pool.query(deleteQuery, [tours_tour_id, amenities_amenities_id], (error, results) => {
    if (error) {
      console.error("Error deleting relation:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Relation not found" });
    }

    res.json({ message: "Relation deleted successfully" });
  });
});

module.exports = router;
