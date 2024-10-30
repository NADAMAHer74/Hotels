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
 * /pages:
 *   post:
 *     summary: Add a new page entry
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Page entry created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/pages", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { page_id } = req.body;

  // Check if the page_id already exists
  const checkQuery = "SELECT COUNT(*) AS count FROM pages WHERE page_id = ?";
  req.pool.query(checkQuery, [page_id], (error, results) => {
    if (error) {
      console.error("Error checking page ID:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results[0].count > 0) {
      return res.status(400).json({ message: "Page ID already exists" });
    }

    // Insert the new page entry
    const insertQuery = `INSERT INTO pages (page_id) VALUES (?)`;
    req.pool.query(insertQuery, [page_id], (error, results) => {
      if (error) {
        console.error("Error inserting page entry:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(201).json({ message: "Page entry created successfully" });
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
 * /pages:
 *   get:
 *     summary: Get all page entries
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of page entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/pages", verifyToken, checkRole(["Admin"]), (req, res) => {
  const query = "SELECT * FROM pages";

  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching page entries:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
      res.render("Pages", { pages: results });  });
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /pages/{id}:
 *   get:
 *     summary: Get a page entry by ID
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The page entry ID
 *     responses:
 *       200:
 *         description: Page entry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Page entry not found
 */
router.get("/pages/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const query = "SELECT * FROM pages WHERE page_id = ?";

  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching page entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Page entry not found" });
    }
    //res.json(results[0]);
    console.log(results.page_id);
    res.render("viewPage", { page: results[0] });  ;
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
 * /pages/{id}:
 *   put:
 *     summary: Update a page entry by ID
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The page entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Page entry updated successfully
 *       404:
 *         description: Page entry not found
 */
router.put("/pages/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { page_name } = req.body;

  const updateQuery = `UPDATE pages SET page_name = ? WHERE page_id = ?`;

  req.pool.query(updateQuery, [page_name, req.params.id], (error, results) => {
    if (error) {
      console.error("Error updating page entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Page entry not found" });
    }
    res.json({ message: "Page entry updated successfully" });
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
 * /pages/{id}:
 *   delete:
 *     summary: Delete a page entry by ID
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The page entry ID
 *     responses:
 *       200:
 *         description: Page entry deleted successfully
 *       404:
 *         description: Page entry not found
 */
router.delete("/pages/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const deleteQuery = "DELETE FROM pages WHERE page_id = ?";

  req.pool.query(deleteQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting page entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Page entry not found" });
    }
    res.json({ message: "Page entry deleted successfully" });
  });
});

router.get("/pages/:page_id/edit", async (req, res) => {
  const query = "SELECT * FROM tours WHERE page_id = ?";
  req.pool.query(query, [req.params.tour_id], (error, results) => {
    if (error) {
      console.error("Error fetching tour:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "page not found" });
    }
    // res.json(results[0]);
    res.render("editPage", { tour: results[0] });
  });
});

module.exports = router;
