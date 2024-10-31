const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middlewares/token");

/**
 * @swagger
 * tags:
 *   name: Banners
 *   description: API to manage banners
 */

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
 *     summary: Create a new banner entry
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               head:
 *                 type: string
 *                 description: Title of the banner
 *               pages_page_id:
 *                 type: string
 *                 description: Page ID associated with the banner
 *     responses:
 *       201:
 *         description: Banner entry created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/banners", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { head, pages_page_id } = req.body;
  const visible=0;
  const insertQuery = `INSERT INTO banners (head, visible, pages_page_id) VALUES (?, ?, ?)`;
  
  req.pool.query(insertQuery, [head, visible, pages_page_id], (error, results) => {
    if (error) {
      console.error("Error inserting banner entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Banner entry created successfully" });
  });
});

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
 *                 properties:
 *                   banner_id:
 *                     type: integer
 *                   head:
 *                     type: string
 *                   visible:
 *                     type: integer
 *                   pages_page_id:
 *                     type: string
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               head:
 *                 type: string
 *               visible:
 *                 type: integer
 *               pages_page_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Banner entry updated successfully
 *       404:
 *         description: Banner entry not found
 */
router.put("/banners/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { head, visible, pages_page_id } = req.body;

  if (visible === 1) {
    const checkVisibleQuery = `SELECT banner_id FROM banners WHERE pages_page_id = ? AND visible = 1 AND banner_id != ?`;
    req.pool.query(checkVisibleQuery, [pages_page_id, req.params.id], (error, results) => {
      if (error) {
        console.error("Error checking for existing visible banner:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "Only one banner can be visible per page" });
      }
      
      const updateQuery = `UPDATE banners SET head = ?, visible = ?, pages_page_id = ? WHERE banner_id = ?`;

      // No conflicting visible banner, proceed with the update
      req.pool.query(updateQuery, [head, visible, pages_page_id, req.params.id], (error, results) => {
        if (error) {
          console.error("Error updating banner entry:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Banner entry not found" });
        }
        res.json({ message: "Banner entry updated successfully" });
      });
    });
  } else {
    // If `visible` is not set to 1, proceed with the update directly
    req.pool.query(updateQuery, [head, visible, pages_page_id, req.params.id], (error, results) => {
      if (error) {
        console.error("Error updating banner entry:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Banner entry not found" });
      }
      res.json({ message: "Banner entry updated successfully" });
    });
  }
});


/**
 * @swagger
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
  const checkVisibleQuery = "SELECT visible FROM banners WHERE banner_id = ?";
  const deleteQuery = "DELETE FROM banners WHERE banner_id = ?";

  // First, check if the banner's `visible` status is 1
  req.pool.query(checkVisibleQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error checking banner visibility:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    // Check if the banner exists
    if (results.length === 0) {
      return res.status(404).json({ message: "Banner entry not found" });
    }

    // If `visible` is 1, return an error response
    if (results[0].visible === 1) {
      return res.status(400).json({ message: "Cannot delete a visible banner" });
    }

    // If `visible` is not 1, proceed with deletion
    req.pool.query(deleteQuery, [req.params.id], (error, results) => {
      if (error) {
        console.error("Error deleting banner entry:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.json({ message: "Banner entry deleted successfully" });
    });
  });
});


module.exports = router;
