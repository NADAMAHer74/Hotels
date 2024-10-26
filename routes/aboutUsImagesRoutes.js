const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const { verifyToken, checkRole } = require("../middlewares/token");
const path = require("path");

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
 *   name: AboutUsImages
 *   description: API to manage About Us Images
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /aboutusimages:
 *   post:
 *     summary: Create a new About Us Image entry
 *     tags: [AboutUsImages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: About Us Image created successfully
 *       500:
 *         description: Internal server error
 */
router.post(
  "/aboutusimages",
  verifyToken,
  checkRole(["Admin"]),
  upload.single("Image"),
  (req, res) => {
    const Image = req.file ? req.file.path : null;
    const visible = 0;
    const insertQuery = `INSERT INTO AboutUsImages (Image, visible) VALUES (?, ?)`;

    req.pool.query(insertQuery, [Image, visible], (error, results) => {
      if (error) {
        console.error("Error inserting About Us Image entry:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(201).json({ message: "About Us Image created successfully" });
    });
  }
);

/**
 * @swagger
 * /aboutusimages:
 *   get:
 *     summary: Get all About Us Images
 *     tags: [AboutUsImages]
 *     responses:
 *       200:
 *         description: A list of About Us Images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   AboutUsImages_ID:
 *                     type: integer
 *                   Image:
 *                     type: string
 *                   visible:
 *                     type: integer
 */
router.get("/aboutusimages", (req, res) => {
  const query = "SELECT * FROM AboutUsImages";

  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching About Us Images:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /aboutusimages/{id}:
 *   get:
 *     summary: Get an About Us Image entry by ID
 *     tags: [AboutUsImages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The About Us Image ID
 *     responses:
 *       200:
 *         description: About Us Image entry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 AboutUsImages_ID:
 *                   type: integer
 *                 Image:
 *                   type: string
 *                 visible:
 *                   type: integer
 *       404:
 *         description: About Us Image entry not found
 */
router.get("/aboutusimages/:id", (req, res) => {
  const query = "SELECT * FROM AboutUsImages WHERE AboutUsImages_ID = ?";

  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching About Us Image entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "About Us Image entry not found" });
    }
    res.json(results[0]);
  });
});

/**
 * @swagger
 * /aboutusimages/{id}:
 *   put:
 *     summary: Update an About Us Image entry by ID with visibility constraints
 *     tags: [AboutUsImages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The About Us Image ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Image:
 *                 type: string
 *                 format: binary
 *               visible:
 *                 type: integer
 *     responses:
 *       200:
 *         description: About Us Image entry updated successfully
 *       400:
 *         description: Visibility change exceeds limit of three visible images or would reduce visible images below three
 *       404:
 *         description: About Us Image entry not found
 */

router.put(
  "/aboutusimages/:id",
  verifyToken,
  checkRole(["Admin"]),
  upload.single("Image"),
  (req, res) => {
    const { visible } = req.body;
    const Image = req.file ? req.file.path : null;

    const countVisibleQuery = `SELECT COUNT(*) AS count FROM AboutUsImages WHERE visible = 1`;

    req.pool.query(countVisibleQuery, (error, countResults) => {
      if (error) {
        console.error("Error counting visible images:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      const currentVisibleCount = countResults[0].count;

      if (visible === 1 && currentVisibleCount >= 3) {
        return res.status(400).json({
          message:
            "Cannot set visibility to 1. Maximum of 3 images can be visible.",
        });
      }

      if (visible === 0 && currentVisibleCount <= 3) {
        return res.status(400).json({
          message:
            "Cannot set visibility to 0. At least 3 images must be visible.",
        });
      }

      const updateQuery = `UPDATE AboutUsImages SET Image = ?, visible = ? WHERE AboutUsImages_ID = ?`;

      req.pool.query(
        updateQuery,
        [Image, visible, req.params.id],
        (error, results) => {
          if (error) {
            console.error("Error updating About Us Image entry:", error);
            return res.status(500).json({ message: "Internal server error" });
          }
          if (results.affectedRows === 0) {
            return res
              .status(404)
              .json({ message: "About Us Image entry not found" });
          }
          res.json({ message: "About Us Image entry updated successfully" });
        }
      );
    });
  }
);

/**
 * @swagger
 * /switch-visibility:
 *   put:
 *     summary: Switch visibility of two About Us Image entries by ID
 *     tags: [AboutUsImages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visibleOffId:
 *                 type: integer
 *               visibleOnId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Visibility switched successfully
 *       404:
 *         description: One or both About Us Image entries not found
 */
router.put(
  "/switch-visibility",
  verifyToken,
  checkRole(["Admin"]),
  (req, res) => {
    const { visibleOffId, visibleOnId } = req.body;

    if (!Number.isInteger(visibleOffId) || !Number.isInteger(visibleOnId)) {
      return res
        .status(400)
        .json({ message: "Both IDs must be valid integers." });
    }

    const getVisibilityQuery = `SELECT AboutUsImages_ID, visible FROM AboutUsImages WHERE AboutUsImages_ID IN (?, ?)`;

    req.pool.query(
      getVisibilityQuery,
      [visibleOffId, visibleOnId],
      (error, results) => {
        if (error) {
          console.error("Error fetching visibility statuses:", error);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length < 2) {
          return res
            .status(404)
            .json({ message: "One or both images not found" });
        }

        const visibilityMap = results.reduce((map, row) => {
          map[row.AboutUsImages_ID] = row.visible;
          return map;
        }, {});

        if (visibilityMap[visibleOffId] === 0) {
          return res.status(400).json({
            message: `Image with ID ${visibleOffId} is already turned off`,
          });
        }

        if (visibilityMap[visibleOnId] === 1) {
          return res.status(400).json({
            message: `Image with ID ${visibleOnId} is already turned on`,
          });
        }

        const updateOffQuery = `UPDATE AboutUsImages SET visible = 0 WHERE AboutUsImages_ID = ?`;
        const updateOnQuery = `UPDATE AboutUsImages SET visible = 1 WHERE AboutUsImages_ID = ?`;

        req.pool.query(updateOffQuery, [visibleOffId], (error, offResult) => {
          if (error) {
            console.error("Error updating visibility off:", error);
            return res.status(500).json({
              message: "Internal server error while turning off visibility.",
            });
          }
          if (offResult.affectedRows === 0) {
            return res.status(404).json({
              message: `Image with ID ${visibleOffId} not found for visibility update`,
            });
          }

          req.pool.query(updateOnQuery, [visibleOnId], (error, onResult) => {
            if (error) {
              console.error("Error updating visibility on:", error);
              return res.status(500).json({
                message: "Internal server error while turning on visibility.",
              });
            }
            if (onResult.affectedRows === 0) {
              return res.status(404).json({
                message: `Image with ID ${visibleOnId} not found for visibility update`,
              });
            }

            res.json({ message: "Visibility switched successfully" });
          });
        });
      }
    );
  }
);

module.exports = router;
