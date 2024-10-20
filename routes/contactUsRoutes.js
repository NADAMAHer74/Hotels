const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /contactus:
 *   post:
 *     summary: Create a new contact form entry
 *     tags: [ContactUs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact form entry created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/contactus", async (req, res) => {
  const { first_name, last_name, email, phone, subject, message } = req.body;
  console.log(req.body);
  const insertQuery = `
    INSERT INTO contact_us_form (first_name, last_name, email, phone, subject, message)
    VALUES (?, ?, ?, ?, ?, ?)`;

  req.pool.query(insertQuery, [first_name, last_name, email, phone, subject, message], (error, results) => {
    if (error) {
      console.error("Error inserting contact form entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    console.log("Query Results:", results);
    console.log("Contact form entry created successfully");

    res.status(201).json({ message: "Contact form entry created successfully" });
  });
});

/**
 * @swagger
 * /contactus:
 *   get:
 *     summary: Get all contact form entries
 *     tags: [ContactUs]
 *     responses:
 *       200:
 *         description: A list of contact form entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/contactus", (req, res) => {
  const query = "SELECT * FROM contact_us_form";
  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching contact form entries:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /contactus/{id}:
 *   get:
 *     summary: Get a contact form entry by ID
 *     tags: [ContactUs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The contact form entry ID
 *     responses:
 *       200:
 *         description: Contact form entry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Contact form entry not found
 */
router.get("/contactus/:id", (req, res) => {
  const query = "SELECT * FROM contact_us_form WHERE form_id = ?";
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching contact form entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Contact form entry not found" });
    }
    res.json(results[0]);
  });
});

/**
 * @swagger
 * /contactus/{id}:
 *   put:
 *     summary: Update a contact form entry by ID
 *     tags: [ContactUs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The contact form entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact form entry updated successfully
 *       404:
 *         description: Contact form entry not found
 */
router.put("/contactus/:id", (req, res) => {
  const { first_name, last_name, email, phone, subject, message } = req.body;

  const updateQuery = `
    UPDATE contact_us_form SET first_name = ?, last_name = ?, email = ?, phone = ?, subject = ?, message = ?
    WHERE form_id = ?`;

  req.pool.query(updateQuery, [first_name, last_name, email, phone, subject, message, req.params.id], (error, results) => {
    if (error) {
      console.error("Error updating contact form entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Contact form entry not found" });
    }
    res.json({ message: "Contact form entry updated successfully" });
  });
});

/**
 * @swagger
 * /contactus/{id}:
 *   delete:
 *     summary: Delete a contact form entry by ID
 *     tags: [ContactUs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The contact form entry ID
 *     responses:
 *       200:
 *         description: Contact form entry deleted successfully
 *       404:
 *         description: Contact form entry not found
 */
router.delete("/contactus/:id", (req, res) => {
  const deleteQuery = "DELETE FROM contact_us_form WHERE form_id = ?";

  req.pool.query(deleteQuery, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting contact form entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Contact form entry not found" });
    }
    res.json({ message: "Contact form entry deleted successfully" });
  });
});

module.exports = router;
