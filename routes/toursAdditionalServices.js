const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middlewares/token");

/**
 * @swagger
 * tags:
 *   name: ToursAdditionalServices
 *   description: API to manage additional services associated with tours
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tours-additional-services:
 *   post:
 *     summary: Create a new tour additional service entry
 *     tags: [ToursAdditionalServices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tour_additional_services:
 *                 type: integer
 *               additional_service_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tour additional service entry created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/tours-additional-services", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { tour_additional_services, additional_service_id } = req.body;
  const insertQuery = `INSERT INTO tours_additional_services (tour_additional_services, additional_service_id) VALUES (?, ?)`;
  
  req.pool.query(insertQuery, [tour_additional_services, additional_service_id], (error, results) => {
    if (error) {
      console.error("Error inserting tour additional service entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Tour additional service entry created successfully" });
  });
});

/**
 * @swagger
 * /tours-additional-services:
 *   get:
 *     summary: Get all tour additional service entries
 *     tags: [ToursAdditionalServices]
 *     responses:
 *       200:
 *         description: A list of tour additional service entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   UserToursAdditionalServices_id:
 *                     type: integer
 *                   tour_additional_services:
 *                     type: integer
 *                   additional_service_id:
 *                     type: integer
 */
router.get("/tours-additional-services", (req, res) => {
  const query = "SELECT * FROM tours_additional_services";
  
  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching tour additional service entries:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /tours-additional-services/{id}:
 *   get:
 *     summary: Get a tour additional service entry by ID
 *     tags: [ToursAdditionalServices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The tour additional service entry ID
 *     responses:
 *       200:
 *         description: Tour additional service entry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 UserToursAdditionalServices_id:
 *                   type: integer
 *                 tour_additional_services:
 *                   type: integer
 *                 additional_service_id:
 *                   type: integer
 *       404:
 *         description: Tour additional service entry not found
 */
router.get("/tours-additional-services/:id", (req, res) => {
  const query = "SELECT * FROM tours_additional_services WHERE UserToursAdditionalServices_id = ?";
  
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching tour additional service entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Tour additional service entry not found" });
    }
    res.json(results[0]);
  });
});

/**
 * @swagger
 * /tours-additional-services/{id}:
 *   put:
 *     summary: Update a tour additional service entry by ID
 *     tags: [ToursAdditionalServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The tour additional service entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tour_additional_services:
 *                 type: integer
 *               additional_service_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tour additional service entry updated successfully
 *       404:
 *         description: Tour additional service entry not found
 */
router.put("/tours-additional-services/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { tour_additional_services, additional_service_id } = req.body;
  const updateQuery = `UPDATE tours_additional_services SET tour_additional_services = ?, additional_service_id = ? WHERE UserToursAdditionalServices_id = ?`;
  
  req.pool.query(updateQuery, [tour_additional_services, additional_service_id, req.params.id], (error, results) => {
    if (error) {
      console.error("Error updating tour additional service entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Tour additional service entry not found" });
    }
    res.json({ message: "Tour additional service entry updated successfully" });
  });
});

/**
 * @swagger
 * /tours-additional-services/{id}:
 *   delete:
 *     summary: Delete a tour additional service entry by ID
 *     tags: [ToursAdditionalServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The tour additional service entry ID
 *     responses:
 *       200:
 *         description: Tour additional service entry deleted successfully
 *       404:
 *         description: Tour additional service entry not found
 */
router.delete("/tours-additional-services/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const deleteQuery = "DELETE FROM tours_additional_services WHERE UserToursAdditionalServices_id = ?";
  
  req.pool.query(deleteQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting tour additional service entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Tour additional service entry not found" });
    }
    res.json({ message: "Tour additional service entry deleted successfully" });
  });
});

module.exports = router;
