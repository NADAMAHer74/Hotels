const express = require("express");
const multer = require("multer")
const path = require("path");;
const router = express.Router();
const { verifyToken, checkRole } = require("../middlewares/token");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });


/**
 * @swagger
 * tags:
 *   name: Services
 *   description: API to manage services
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /services:
 *   post:
 *     summary: Create a new service entry
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
*         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Head:
 *                 type: string
 *               Body:
 *                 type: string
 *               Icon:
 *                 type: string
 *                 format: binary
 *               visible:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Service entry created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/services", verifyToken, checkRole(["Admin"]),upload.single("Icon"), (req, res) => {
  const { Head, Body, visible } = req.body;
  const Icon = req.file ? req.file.path : null;
  const insertQuery = `INSERT INTO Services (Head, Body, Icon, visible) VALUES (?, ?, ?, ?)`;
  
  req.pool.query(insertQuery, [Head, Body, Icon, visible], (error, results) => {
    if (error) {
      console.error("Error inserting service entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Service entry created successfully" });
  });
});

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all service entries
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: A list of service entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Services_ID:
 *                     type: integer
 *                   Head:
 *                     type: string
 *                   Body:
 *                     type: string
 *                   Icon:
 *                     type: string
 *                   visible:
 *                     type: integer
 */
router.get("/services", (req, res) => {
  const query = "SELECT * FROM Services";
  
  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching service entries:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get a service entry by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The service entry ID
 *     responses:
 *       200:
 *         description: Service entry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Services_ID:
 *                   type: integer
 *                 Head:
 *                   type: string
 *                 Body:
 *                   type: string
 *                 Icon:
 *                   type: string
 *                 visible:
 *                   type: integer
 *       404:
 *         description: Service entry not found
 */
router.get("/services/:id", (req, res) => {
  const query = "SELECT * FROM Services WHERE Services_ID = ?";
  
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching service entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Service entry not found" });
    }
    res.json(results[0]);
  });
});

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update a service entry by ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The service entry ID
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Head:
 *                 type: string
 *               Body:
 *                 type: string
 *               Icon:
 *                 type: string
 *                 format: binary
 *               visible:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Service entry updated successfully
 *       404:
 *         description: Service entry not found
 */
router.put("/services/:id", verifyToken, checkRole(["Admin"]), upload.single("Icon"), (req, res) => {
  const { Head, Body, visible } = req.body;
  const Icon = req.file ? req.file.path : null;
  const updateQuery = `UPDATE Services SET Head = ?, Body = ?, Icon = ?, visible = ? WHERE Services_ID = ?`;
  
  req.pool.query(updateQuery, [Head, Body, Icon, visible, req.params.id], (error, results) => {
    if (error) {
      console.error("Error updating service entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Service entry not found" });
    }
    res.json({ message: "Service entry updated successfully" });
  });
});

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete a service entry by ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The service entry ID
 *     responses:
 *       200:
 *         description: Service entry deleted successfully
 *       404:
 *         description: Service entry not found
 */
router.delete("/services/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const deleteQuery = "DELETE FROM Services WHERE Services_ID = ?";
  
  req.pool.query(deleteQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting service entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Service entry not found" });
    }
    res.json({ message: "Service entry deleted successfully" });
  });
});

module.exports = router;
