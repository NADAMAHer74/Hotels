const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken, checkRole } = require("../middlewares/token");

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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Image:
 *                 type: string
 *     responses:
 *       201:
 *         description: About Us Image created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/aboutusimages", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { Image } = req.body;
  const visible = 0; // Default value for visibility
  const insertQuery = `INSERT INTO AboutUsImages (Image, visible) VALUES (?, ?)`;

  req.pool.query(insertQuery, [Image, visible], (error, results) => {
    if (error) {
      console.error("Error inserting About Us Image entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "About Us Image created successfully" });
  });
});

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
      return res.status(404).json({ message: "About Us Image entry not found" });
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Image:
 *                 type: string
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

router.put("/aboutusimages/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
    const { Image, visible } = req.body;
  
    // Check how many images are currently visible
    const countVisibleQuery = `SELECT COUNT(*) AS count FROM AboutUsImages WHERE visible = 1`;
    
    req.pool.query(countVisibleQuery, (error, countResults) => {
      if (error) {
        console.error("Error counting visible images:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
  
      const currentVisibleCount = countResults[0].count;
  
      // If the image visibility is being set to 1
      if (visible === 1) {
        // Check if the current count is already 3
        if (currentVisibleCount >= 3) {
          return res.status(400).json({ message: "Cannot set visibility to 1. Maximum of 3 images can be visible." });
        }
      }
  
      // If the image visibility is being set to 0
      if (visible === 0) {
        // Check if the current count is 3 (i.e., trying to set one of them to 0)
        if (currentVisibleCount <= 3) {
          return res.status(400).json({ message: "Cannot set visibility to 0. At least 3 images must be visible." });
        }
      }
  
      const updateQuery = `UPDATE AboutUsImages SET Image = ?, visible = ? WHERE AboutUsImages_ID = ?`;
      
      req.pool.query(updateQuery, [Image, visible, req.params.id], (error, results) => {
        if (error) {
          console.error("Error updating About Us Image entry:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "About Us Image entry not found" });
        }
        res.json({ message: "About Us Image entry updated successfully" });
      });
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
 *                 description: The ID of the image to turn its visibility off
 *               visibleOnId:
 *                 type: integer
 *                 description: The ID of the image to turn its visibility on
 *     responses:
 *       200:
 *         description: Visibility switched successfully
 *       404:
 *         description: One or both About Us Image entries not found
 */
router.put("/switch-visibility", verifyToken, checkRole(["Admin"]), (req, res) => {
  console.log("Switching visibility of two images");  
  console.log(req.body);
  const { visibleOffId, visibleOnId } = req.body;

  // Check if the IDs are valid numbers
  if (!Number.isInteger(visibleOffId) || !Number.isInteger(visibleOnId)) {
    return res.status(400).json({ message: "Both IDs must be valid integers." });
  }

  console.log(`Turning off visibility for ID: ${visibleOffId}, Turning on visibility for ID: ${visibleOnId}`);

  // Query to get current visibility status of both images
  const getVisibilityQuery = `SELECT AboutUsImages_ID, visible FROM AboutUsImages WHERE AboutUsImages_ID IN (?, ?)`;

  req.pool.query(getVisibilityQuery, [visibleOffId, visibleOnId], (error, results) => {
    if (error) {
      console.error("Error fetching visibility statuses:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    // Ensure both images are found
    if (results.length < 2) {
      return res.status(404).json({ message: "One or both images not found" });
    }

    // Map results to easily find the visibility statuses
    const visibilityMap = results.reduce((map, row) => {
      map[row.AboutUsImages_ID] = row.visible;
      return map;
    }, {});

    // Check if the image to turn off is already off
    if (visibilityMap[visibleOffId] === 0) {
      return res.status(400).json({ message: `Image with ID ${visibleOffId} is already turned off` });
    }

    // Check if the image to turn on is already on
    if (visibilityMap[visibleOnId] === 1) {
      return res.status(400).json({ message: `Image with ID ${visibleOnId} is already turned on` });
    }

    // Proceed to update visibility
    const updateOffQuery = `UPDATE AboutUsImages SET visible = 0 WHERE AboutUsImages_ID = ?`;
    const updateOnQuery = `UPDATE AboutUsImages SET visible = 1 WHERE AboutUsImages_ID = ?`;

    req.pool.query(updateOffQuery, [visibleOffId], (error, offResult) => {
      if (error) {
        console.error("Error updating visibility off:", error);
        return res.status(500).json({ message: "Internal server error while turning off visibility." });
      }
      if (offResult.affectedRows === 0) {
        return res.status(404).json({ message: `Image with ID ${visibleOffId} not found for visibility update` });
      }

      req.pool.query(updateOnQuery, [visibleOnId], (error, onResult) => {
        if (error) {
          console.error("Error updating visibility on:", error);
          return res.status(500).json({ message: "Internal server error while turning on visibility." });
        }
        if (onResult.affectedRows === 0) {
          return res.status(404).json({ message: `Image with ID ${visibleOnId} not found for visibility update` });
        }

        res.json({ message: "Visibility switched successfully" });
      });
    });
  });
});

  

/**
 * @swagger
 * /aboutusimages/{id}:
 *   delete:
 *     summary: Delete an About Us Image entry by ID
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
 *     responses:
 *       200:
 *         description: About Us Image entry deleted successfully
 *       404:
 *         description: About Us Image entry not found
 */
router.delete("/aboutusimages/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const deleteQuery = "DELETE FROM AboutUsImages WHERE AboutUsImages_ID = ?";

  req.pool.query(deleteQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting About Us Image entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "About Us Image entry not found" });
    }
    res.json({ message: "About Us Image entry deleted successfully" });
  });
});

module.exports = router;
