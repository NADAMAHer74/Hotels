const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /banners:
 *   post:
 *     summary: Add a new banner entry
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               head:
 *                 type: string
 *               pages_page_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Banner entry created successfully
 *       400:
 *         description: Invalid page_id
 *       500:
 *         description: Internal server error
 */
router.post(
  "/banners",
  verifyToken,
  checkRole(["Admin"]),
  upload.single("image"),
  (req, res) => {
    const { head, pages_page_id } = req.body;
    const image = req.file ? req.file.path : null;

    // Check if the page_id exists in the pages table
    const checkPageQuery =
      "SELECT COUNT(*) AS count FROM pages WHERE page_id = ?";
    req.pool.query(checkPageQuery, [pages_page_id], (error, results) => {
      if (error) {
        console.error("Error checking page ID:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results[0].count === 0) {
        return res.status(400).json({ message: "Invalid page_id" });
      }

      const insertQuery = `INSERT INTO banners (image, head, pages_page_id) VALUES (?, ?, ?)`;
      req.pool.query(
        insertQuery,
        [image, head, pages_page_id],
        (error, results) => {
          if (error) {
            console.error("Error inserting banner entry:", error);
            return res.status(500).json({ message: "Internal server error" });
          }
          res
            .status(201)
            .json({ message: "Banner entry created successfully" });
        }
      );
    });
  }
);

/**
 * @swagger
 * /banners:
 *   get:
 *     summary: Get all banner entries
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: A list of banner entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/banners", (req, res) => {
  const query = "SELECT * FROM banners";

  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching banner entries:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /banners/{id}:
 *   get:
 *     summary: Get a banner entry by ID
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The banner entry ID
 *     responses:
 *       200:
 *         description: Banner entry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Banner entry not found
 */
router.get("/banners/:id", (req, res) => {
  const query = "SELECT * FROM banners WHERE banner_id = ?";

  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching banner entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Banner entry not found" });
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
 * /banners/{id}:
 *   put:
 *     summary: Update a banner entry by ID
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The banner entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               head:
 *                 type: string
 *               pages_page_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Banner entry updated successfully
 *       400:
 *         description: Invalid page_id
 *       404:
 *         description: Banner entry not found
 */
router.put(
  "/banners/:id",
  verifyToken,
  checkRole(["Admin"]),
  upload.single("image"),
  (req, res) => {
    const { head, pages_page_id } = req.body;
    const image = req.file ? req.file.path : null;

    // Check if the page_id exists in the pages table
    const checkPageQuery =
      "SELECT COUNT(*) AS count FROM pages WHERE page_id = ?";
    req.pool.query(checkPageQuery, [pages_page_id], (error, results) => {
      if (error) {
        console.error("Error checking page ID:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results[0].count === 0) {
        return res.status(400).json({ message: "Invalid page_id" });
      }

      const updateQuery = `UPDATE banners SET image = ?, head = ?, pages_page_id = ? WHERE banner_id = ?`;
      req.pool.query(
        updateQuery,
        [image, head, pages_page_id, req.params.id],
        (error, results) => {
          if (error) {
            console.error("Error updating banner entry:", error);
            return res.status(500).json({ message: "Internal server error" });
          }
          if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Banner entry not found" });
          }
          res.json({ message: "Banner entry updated successfully" });
        }
      );
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
 * /banners/{id}:
 *   delete:
 *     summary: Delete a banner entry by ID
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The banner entry ID
 *     responses:
 *       200:
 *         description: Banner entry deleted successfully
 *       404:
 *         description: Banner entry not found
 */
router.delete("/banners/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const deleteQuery = "DELETE FROM banners WHERE banner_id = ?";

  req.pool.query(deleteQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting banner entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Banner entry not found" });
    }
    res.json({ message: "Banner entry deleted successfully" });
  });
});

module.exports = router;
