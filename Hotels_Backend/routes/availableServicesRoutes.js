const express = require("express");
const jwt = require("jsonwebtoken");
const { verifyToken, checkRole } = require("../middlewares/token");
const getCurrentTimestamp = require("../migrations/time");
const router = express.Router();


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /available_additional_services:
 *   post:
 *     summary: Create available additional service
 *     tags: [Available Additional Services]
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
 *         description: Service created successfully
 */
router.post("/available_additional_services", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { service_name, price } = req.body;
  const insertQuery = `INSERT INTO available_additional_services (service_name, price, created_at) VALUES (?, ?, ?)`;
  const created_at = getCurrentTimestamp();
  
  req.pool.query(insertQuery, [service_name, price, created_at], (error, results) => {
    if (error) {
      console.error("Error creating service:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Service created successfully" });
  });
});

/**
 * @swagger
 * /available_additional_services:
 *   get:
 *     summary: Get all available additional services
 *     tags: [Available Additional Services]
 *     responses:
 *       200:
 *         description: A list of available additional services
 */
router.get("/available_additional_services", (req, res) => {
  const query = `SELECT * FROM available_additional_services`;

  req.pool.query(query, (error, services) => {
    if (error) {
      console.error("Error fetching services:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.json(services);
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
 *
 * /available_additional_services/{id}:
 *   put:
 *     summary: Update available additional service
 *     tags: [Available Additional Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
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
 *         description: Service updated successfully
 *       404:
 *         description: Service not found
 */
router.put(
  "/available_additional_services/:id",
  verifyToken,
  checkRole(["Admin"]),
  (req, res) => {
    const { id } = req.params;
    const { service_name, price } = req.body;

    const updates = [];
    const updateFields = [];

    if (service_name !== undefined) {
      updates.push(service_name);
      updateFields.push("service_name = ?");
    }
    if (price !== undefined) {
      updates.push(price);
      updateFields.push("price = ?");
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    updates.push(id);

    const updateServiceQuery = `
      UPDATE available_additional_services
      SET ${updateFields.join(", ")}
      WHERE available_additional_service_id = ?`;

    req.pool.query(updateServiceQuery, updates, (error, updateResult) => {
      if (error) {
        console.error("Error updating service:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ message: "Service not found" });
      }

      res.json({ message: "Service updated successfully" });
    });
  }
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /available_additional_services/{id}:
 *   delete:
 *     summary: Update available additional service
 *     tags: [Available Additional Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
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
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 */
router.delete(
  "/available_additional_services/:id",
  verifyToken,
  checkRole(["Admin"]),
  async (req, res) => {
    const { id } = req.params;

    try {
      const deleteServiceQuery = `
        DELETE FROM available_additional_services WHERE available_additional_service_id = ?`;
      const deleteResult = await req.pool.query(deleteServiceQuery, [id]);

      if (deleteResult.affectedRows === 0) {
        return res.status(404).json({ message: "Service not found" });
      }

      res.json({ message: "Service deleted successfully" });
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
module.exports = router;
