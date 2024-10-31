const express = require("express");
const { verifyToken, checkRole } = require("../middlewares/token");
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
 * /user_tours_additional_services:
 *   post:
 *     summary: Add an additional service to a user tour
 *     tags: [User Tours Additional Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_tour_id:
 *                 type: integer
 *               additional_service_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Service added to user tour successfully
 *       400:
 *         description: Bad request (e.g., missing or invalid parameters)
 *       500:
 *         description: Internal server error
 */

router.post("/user_tours_additional_services", verifyToken,  (req, res) => {
    const { user_tour_id, additional_service_id } = req.body;

    console.log(req.body); // Log the request body for debugging

    // Validate input
    if (typeof user_tour_id !== 'number' || typeof additional_service_id !== 'number' || typeof available !== 'number') {
        return res.status(400).json({ message: "Bad request: Invalid input data" });
    }

    const insertQuery = `INSERT INTO user_tours_additional_services (user_tour_id, additional_service_id, available) VALUES (?, ?, ?)`;

    req.pool.query(insertQuery, [user_tour_id, additional_service_id, available], (error, results) => {
        if (error) {
            console.error("Error adding service to user tour:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({ message: "Service added to user tour successfully" });
    });
});


/**
 * @swagger
 * /user_tours_additional_services:
 *   get:
 *     summary: Get all additional services added to user tours
 *     tags: [User Tours Additional Services]
 *     responses:
 *       200:
 *         description: A list of all additional services associated with user tours
 */
router.get("/user_tours_additional_services", async (req, res) => {
  const query = `SELECT * FROM user_tours_additional_services`;
  
  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching user tour services:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /user_tours_additional_services/{id}:
 *   get:
 *     summary: Get a specific additional service for a user tour
 *     tags: [User Tours Additional Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Details of the specified additional service for the user tour
 *       404:
 *         description: Relationship not found
 */
router.get(
  "/user_tours_additional_services/:id",
  async (req, res) => {
    const { id } = req.params;

    const query = `
      SELECT * FROM user_tours_additional_services WHERE UserToursAdditionalServices_id = ?`;

    req.pool.query(query, [id], (error, results) => {
      if (error) {
        console.error("Error fetching user tour service:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "UserToursAdditionalServices_id not found" });
      }

      res.json(results[0]);
    });
  }
);

/**
 * @swagger
 * /user_tours_additional_services/{id}:
 *   put:
 *     summary: Update an additional service for a user tour
 *     tags: [User Tours Additional Services]
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
 *               user_tour_id:
 *                 type: integer
 *               additional_service_id:
 *                 type: integer
 *               available:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       404:
 *         description: Service not found for the user tour
 */
router.put(
  "/user_tours_additional_services/:id",
  verifyToken,
  checkRole(["Admin"]),
  async (req, res) => {
    const { id } = req.params;
    const { user_tour_id, additional_service_id, available } = req.body;

    const updateQuery = `
      UPDATE user_tours_additional_services 
      SET user_tour_id = ?, additional_service_id = ?, available = ?
      WHERE UserToursAdditionalServices_id = ?`;

    req.pool.query(updateQuery, [user_tour_id, additional_service_id, available, id], (error, results) => {
      if (error) {
        console.error("Error updating user tour service:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Service not found for the user tour" });
      }

      res.json({ message: "Service updated successfully" });
    });
  }
);

/**
 * @swagger
 * /user_tours_additional_services/{id}:
 *   delete:
 *     summary: Update an additional service for a user tour
 *     tags: [User Tours Additional Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 */
router.delete(
  "/user_tours_additional_services/:id",
  verifyToken,
  checkRole(["Admin"]),
  (req, res) => {
    const deleteQuery = "DELETE FROM user_tours_additional_services WHERE UserToursAdditionalServices_id = ?";

    req.pool.query(deleteQuery, [req.params.id], (error, results) => {
      if (error) {
        console.error("Error deleting additional service entry:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "UserToursAdditionalServices_id not found" });
      }
      res.json({ message: "UserToursAdditionalServices_id entry deleted successfully" });
    });
  }
);

module.exports = router;
