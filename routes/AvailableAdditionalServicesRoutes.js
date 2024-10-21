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
 * /available_additional_services:
 *   post:
 *     summary: Add a new additional service
 *     tags: [AvailableAdditionalServices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Additional service created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/available_additional_services", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { service_name, price } = req.body;

  const insertQuery = `
    INSERT INTO available_additional_services (service_name, price) VALUES (?, ?)
  `;

  req.pool.query(insertQuery, [service_name, price], (error, results) => {
    if (error) {
      console.error("Error inserting additional service:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Additional service created successfully" });
  });
});

/**
 * @swagger
 * /available_additional_services:
 *   get:
 *     summary: Get all additional services
 *     tags: [AvailableAdditionalServices]
 *     responses:
 *       200:
 *         description: A list of additional services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   available_additional_service_id:
 *                     type: integer
 *                   service_name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 */
router.get("/available_additional_services", (req, res) => {
  const query = "SELECT * FROM available_additional_services";

  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching additional services:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /available_additional_services/{id}:
 *   get:
 *     summary: Get an additional service by ID
 *     tags: [AvailableAdditionalServices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The additional service ID
 *     responses:
 *       200:
 *         description: Additional service details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 available_additional_service_id:
 *                   type: integer
 *                 service_name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Additional service not found
 */
router.get("/available_additional_services/:id", (req, res) => {
  const query = "SELECT * FROM available_additional_services WHERE available_additional_service_id = ?";

  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching additional service:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Additional service not found" });
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
 * /available_additional_services/{id}:
 *   put:
 *     summary: Update an additional service by ID
 *     tags: [AvailableAdditionalServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The additional service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Additional service updated successfully
 *       404:
 *         description: Additional service not found
 */
router.put("/available_additional_services/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { service_name, price } = req.body;

  const updateQuery = `
    UPDATE available_additional_services 
    SET service_name = ?, price = ? 
    WHERE available_additional_service_id = ?
  `;

  req.pool.query(updateQuery, [service_name, price, req.params.id], (error, results) => {
    if (error) {
      console.error("Error updating additional service:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Additional service not found" });
    }
    res.json({ message: "Additional service updated successfully" });
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
 * /available_additional_services/{id}:
 *   delete:
 *     summary: Delete an additional service by ID
 *     tags: [AvailableAdditionalServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The additional service ID
 *     responses:
 *       200:
 *         description: Additional service deleted successfully
 *       404:
 *         description: Additional service not found
 */
router.delete("/available_additional_services/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const deleteQuery = "DELETE FROM available_additional_services WHERE available_additional_service_id = ?";

  req.pool.query(deleteQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting additional service:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Additional service not found" });
    }
    res.json({ message: "Additional service deleted successfully" });
  });
});

module.exports = router;
