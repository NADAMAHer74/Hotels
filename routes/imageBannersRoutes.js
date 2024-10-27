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
 *   name: ImageBanners
 *   description: API to manage Image Banners
 */

/**
 * @swagger
 * /imagebanners:
 *   post:
 *     summary: Create a new Image Banner entry
 *     tags: [ImageBanners]
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
 *               banner_page_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Image Banner created successfully
 *       500:
 *         description: Internal server error
 */
router.post(
  "/imagebanners",
  verifyToken,
  checkRole(["Admin"]),
  upload.single("Image"),
  (req, res) => {
    console.log(req.body);
    const { banner_page_id } = req.body;
    const Image = req.file ? req.file.path : null;
    const visible = 0;
    console.log(banner_page_id, Image, visible);
    const insertQuery = `INSERT INTO ImageBanners (Image, visible, banner_page_id) VALUES (?, ?, ?)`;

    req.pool.query(insertQuery, [Image, visible, banner_page_id], (error, results) => {
      if (error) {
        console.error("Error inserting Image Banner entry:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(201).json({ message: "Image Banner created successfully" });
    });
  }
);

/**
 * @swagger
 * /imagebanners:
 *   get:
 *     summary: Get all Image Banners
 *     tags: [ImageBanners]
 *     responses:
 *       200:
 *         description: A list of Image Banners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ImageBanner_ID:
 *                     type: integer
 *                   Image:
 *                     type: string
 *                   visible:
 *                     type: integer
 */
router.get("/imagebanners", (req, res) => {
  const query = "SELECT * FROM ImageBanners";

  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching Image Banners:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /imagebanners/{id}:
 *   get:
 *     summary: Get an Image Banner entry by ID
 *     tags: [ImageBanners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Image Banner ID
 *     responses:
 *       200:
 *         description: Image Banner entry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ImageBanner_ID:
 *                   type: integer
 *                 Image:
 *                   type: string
 *                 visible:
 *                   type: integer
 *       404:
 *         description: Image Banner entry not found
 */
router.get("/imagebanners/:id", (req, res) => {
  const query = "SELECT * FROM ImageBanners WHERE banner_image_id = ?";
    console.log(req.params.id);
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching Image Banner entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Image Banner entry not found" });
    }
    res.json(results[0]);
  });
});

/**
 * @swagger
 * /imagebanners/{id}:
 *   put:
 *     summary: Update an Image Banner entry by ID with visibility constraints
 *     tags: [ImageBanners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Image Banner ID
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
 *               visible:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Image Banner entry updated successfully
 *       400:
 *         description: Visibility change exceeds limit
 *       404:
 *         description: Image Banner entry not found
 */
router.put(
    "/imagebanners/:id",
    verifyToken,
    checkRole(["Admin"]),
    upload.single("image"),
    (req, res) => {
      const { visible } = req.body;
      const Image = req.file ? req.file.path : null;
      const bannerId = req.params.id;
  
      // Check the associated page ID for the current banner
      const getPageIdQuery = `SELECT pages_page_id FROM banners INNER JOIN imageBanners ON banners.banner_id = imageBanners.banner_page_id WHERE banner_image_id = ?`;
  
      req.pool.query(getPageIdQuery, [bannerId], (error, results) => {
        if (error) {
          console.error("Error fetching page ID:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: "Image Banner entry not found" });
        }

        const pageId = results[0].pages_page_id;
        console.log(pageId)
        const maxVisible = (pageId === 'home') ? 3 : 1;
        console.log(maxVisible)
        // Count current visible images
        const countVisibleQuery = `SELECT COUNT(*) AS count FROM imageBanners WHERE visible = 1 AND banner_page_id = ?`;
  
        req.pool.query(countVisibleQuery, [pageId], (error, countResults) => {
          if (error) {
            console.error("Error counting visible images:", error);
            return res.status(500).json({ message: "Internal server error" });
          }
  
          const currentVisibleCount = countResults[0].count;
          console.log(currentVisibleCount)  
  
          if (visible === 1 && currentVisibleCount >= maxVisible) {
            return res.status(400).json({
              message: `Cannot set visibility to 1. Maximum of ${maxVisible} images can be visible for page ID ${pageId}.`,
            });
          }
  
          if (visible === 0 && currentVisibleCount <= maxVisible) {
            return res.status(400).json({
              message: `Cannot set visibility to 0. At least ${maxVisible} images must be visible for page ID ${pageId}.`,
            });
          }
  
          const updateQuery = `UPDATE imageBanners SET image = ?, visible = ? WHERE banner_image_id = ?`;
  
          req.pool.query(updateQuery, [Image, visible, bannerId], (error, results) => {
            if (error) {
              console.error("Error updating Image Banner entry:", error);
              return res.status(500).json({ message: "Internal server error" });
            }
            if (results.affectedRows === 0) {
              return res.status(404).json({ message: "Image Banner entry not found" });
            }
            res.json({ message: "Image Banner entry updated successfully" });
          });
        });
      });
    }
  );
  

/**
 * @swagger
 * /switchbannersvisibility:
 *   put:
 *     summary: Switch visibility of two Image Banner entries by ID
 *     tags: [ImageBanners]
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
 *         description: One or both Image Banner entries not found
 */
router.put(
  "/switchbannersvisibility",
  verifyToken,
  checkRole(["Admin"]),
  (req, res) => {
    const { visibleOffId, visibleOnId } = req.body;

    if (!Number.isInteger(visibleOffId) || !Number.isInteger(visibleOnId)) {
      return res.status(400).json({ message: "Both IDs must be valid integers." });
    }

    const getVisibilityQuery = `SELECT ImageBanner_ID, visible FROM ImageBanners WHERE ImageBanner_ID IN (?, ?)`;

    req.pool.query(getVisibilityQuery, [visibleOffId, visibleOnId], (error, results) => {
      if (error) {
        console.error("Error fetching visibility statuses:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length < 2) {
        return res.status(404).json({ message: "One or both images not found" });
      }

      const visibilityMap = results.reduce((map, row) => {
        map[row.ImageBanner_ID] = row.visible;
        return map;
      }, {});

      if (visibilityMap[visibleOffId] === 0) {
        return res.status(400).json({ message: `Image with ID ${visibleOffId} is already turned off` });
      }

      if (visibilityMap[visibleOnId] === 1) {
        return res.status(400).json({ message: `Image with ID ${visibleOnId} is already turned on` });
      }

      const updateQuery = `UPDATE ImageBanners SET visible = CASE WHEN ImageBanner_ID = ? THEN 0 WHEN ImageBanner_ID = ? THEN 1 END WHERE ImageBanner_ID IN (?, ?)`;

      req.pool.query(updateQuery, [visibleOffId, visibleOnId, visibleOffId, visibleOnId], (error) => {
        if (error) {
          console.error("Error switching visibility statuses:", error);
          return res.status(500).json({ message: "Internal server error" });
        }

        res.json({ message: "Visibility switched successfully" });
      });
    });
  }
);


/**
 * @swagger
 * /ImageBanner/{id}:
 *   delete:
 *     summary: Delete a What To Do Image entry by ID
 *     tags: [ImageBanners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The What To Do Image ID
 *     responses:
 *       200:
 *         description: Imgage Banner entry deleted successfully
 *       404:
 *         description: Imgage Banner entry not found
 */
router.delete(
    "/ImageBanner/:id",
    verifyToken,
    checkRole(["Admin"]),
    (req, res) => {
      const deleteQuery = "DELETE FROM ImageBanners WHERE ImageBanner_ID = ?";
  
      req.pool.query(deleteQuery, [req.params.id], (error, results) => {
        if (error) {
          console.error("Error deleting What To Do Image entry:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "Imgage Banner entry not found" });
        }
        res.json({ message: "Imgage Banner entry deleted successfully" });
      });
    }
  );


module.exports = router;
