const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken, checkRole } = require("../middlewares/token");

/**
 * @swagger
 * tags:
 *   name: WhatToDoImages
 *   description: API to manage What To Do Images
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /whattodoimages:
 *   post:
 *     summary: Create a new What To Do Image entry
 *     tags: [WhatToDoImages]
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
 *         description: What To Do Image created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/whattodoimages", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { Image } = req.body;
  const visible = 0; // Default visibility
  const insertQuery = `INSERT INTO WhatToDoImages (Image, visible) VALUES (?, ?)`;

  req.pool.query(insertQuery, [Image, visible], (error, results) => {
    if (error) {
      console.error("Error inserting What To Do Image entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "What To Do Image created successfully" });
  });
});

/**
 * @swagger
 * /whattodoimages:
 *   get:
 *     summary: Get all What To Do Images
 *     tags: [WhatToDoImages]
 *     responses:
 *       200:
 *         description: A list of What To Do Images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   WhatToDoImage_ID:
 *                     type: integer
 *                   Image:
 *                     type: string
 *                   visible:
 *                     type: integer
 */
router.get("/whattodoimages", (req, res) => {
  const query = "SELECT * FROM WhatToDoImages";

  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching What To Do Images:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /whattodoimages/{id}:
 *   get:
 *     summary: Get a What To Do Image entry by ID
 *     tags: [WhatToDoImages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The What To Do Image ID
 *     responses:
 *       200:
 *         description: What To Do Image entry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 WhatToDoImage_ID:
 *                   type: integer
 *                 Image:
 *                   type: string
 *                 visible:
 *                   type: integer
 *       404:
 *         description: What To Do Image entry not found
 */
router.get("/whattodoimages/:id", (req, res) => {
  const query = "SELECT * FROM WhatToDoImages WHERE WhatToDoImage_ID = ?";

  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching What To Do Image entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "What To Do Image entry not found" });
    }
    res.json(results[0]);
  });
});

/**
 * @swagger
 * /whattodoimages/{id}:
 *   put:
 *     summary: Update a What To Do Image entry by ID
 *     tags: [WhatToDoImages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The What To Do Image ID
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
 *         description: What To Do Image entry updated successfully
 *       404:
 *         description: What To Do Image entry not found
 */

router.put("/whattodoimages/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
    const { Image, visible } = req.body;
  
    // Check how many images are currently visible
    const countVisibleQuery = `SELECT COUNT(*) AS count FROM WhatToDoImages WHERE visible = 1`;
    
    req.pool.query(countVisibleQuery, (error, countResults) => {
      if (error) {
        console.error("Error counting visible images:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
  
      const currentVisibleCount = countResults[0].count;
  
      // If the image visibility is being set to 1
      if (visible === 1) {
        // Check if the current count is already 3
        if (currentVisibleCount >= 1) {
          return res.status(400).json({ message: "Cannot set visibility to 1. Maximum of 1 images can be visible." });
        }
      }
  
      // If the image visibility is being set to 0
      if (visible === 0) {
        // Check if the current count is 3 (i.e., trying to set one of them to 0)
        if (currentVisibleCount <= 1) {
          return res.status(400).json({ message: "Cannot set visibility to 0. At least 1 images must be visible." });
        }
      }
  
      const updateQuery = `UPDATE WhatToDoImages SET Image = ?, visible = ? WHERE WhatToDoImage_ID = ?`;
      
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
 * /whattodoimagesvisibilityswitch:
 *   put:
 *     summary: Switch visibility of two About Us Image entries by ID
 *     tags: [WhatToDoImages]
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
  router.put("/whattodoimagesvisibilityswitch", verifyToken, checkRole(["Admin"]), (req, res) => {
    console.log("Switching visibility of two images");  
    console.log(req.body);
    const { visibleOffId, visibleOnId } = req.body;
  
    // Check if the IDs are valid numbers
    if (!Number.isInteger(visibleOffId) || !Number.isInteger(visibleOnId)) {
      return res.status(400).json({ message: "Both IDs must be valid integers." });
    }
  
    console.log(`Turning off visibility for ID: ${visibleOffId}, Turning on visibility for ID: ${visibleOnId}`);
  
    // Query to get current visibility status of both images
    const getVisibilityQuery = `SELECT WhatToDoImage_ID, visible FROM whattodoimages WHERE WhatToDoImage_ID IN (?, ?)`;
  
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
        map[row.WhatToDoImage_ID] = row.visible;
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
      const updateOffQuery = `UPDATE whattodoimages SET visible = 0 WHERE WhatToDoImage_ID = ?`;
      const updateOnQuery = `UPDATE whattodoimages SET visible = 1 WHERE WhatToDoImage_ID = ?`;
  
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
 * /whattodoimages/{id}:
 *   delete:
 *     summary: Delete a What To Do Image entry by ID
 *     tags: [WhatToDoImages]
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
 *         description: What To Do Image entry deleted successfully
 *       404:
 *         description: What To Do Image entry not found
 */
router.delete("/whattodoimages/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const deleteQuery = "DELETE FROM WhatToDoImages WHERE WhatToDoImage_ID = ?";

  req.pool.query(deleteQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting What To Do Image entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "What To Do Image entry not found" });
    }
    res.json({ message: "What To Do Image entry deleted successfully" });
  });
});

module.exports = router;
