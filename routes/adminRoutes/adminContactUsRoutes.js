const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyToken, checkRole } = require("../../middlewares/token");

router.post("/admin/contactus", async (req, res) => {
  const { first_name, last_name, email, phone, subject, message } = req.body;
  console.log(req.body);
  const insertQuery = `
    INSERT INTO contact_us_form (first_name, last_name, email, phone, subject, message)
    VALUES (?, ?, ?, ?, ?, ?)`;

  req.pool.query(
    insertQuery,
    [first_name, last_name, email, phone, subject, message],
    (error, results) => {
      if (error) {
        console.error("Error inserting contact form entry:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      console.log("Query Results:", results);
      console.log("Contact form entry created successfully");

      res
        .status(201)
        .json({ message: "Contact form entry created successfully" });
    }
  );
});


router.get("/admin/contactus", verifyToken, checkRole(["Admin"]), (req, res) => {
  const query = "SELECT * FROM contact_us_form";
  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching contact form entries:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    // res.json(results);
    res.render("contacts", { contacts: results });
  });
});


router.get("/admin/contactus/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const query = "SELECT * FROM contact_us_form WHERE form_id = ?";
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching contact form entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Contact form entry not found" });
    }
    // res.json(results[0]);
    res.render("viewContact", { contact: results[0] });
  });
});


router.put("/admin/contactus/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
  const { first_name, last_name, email, phone, subject, message } = req.body;

  const updateQuery = `
    UPDATE contact_us_form SET first_name = ?, last_name = ?, email = ?, phone = ?, subject = ?, message = ?
    WHERE form_id = ?`;

  req.pool.query(
    updateQuery,
    [first_name, last_name, email, phone, subject, message, req.params.id],
    (error, results) => {
      if (error) {
        console.error("Error updating contact form entry:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Contact form entry not found" });
      }
      res.json({ message: "Contact form entry updated successfully" });
    }
  );
});


router.delete(
  "/admin/contactus/:id",
  verifyToken,
  checkRole(["Admin"]),
  (req, res) => {
    const deleteQuery = "DELETE FROM contact_us_form WHERE form_id = ?";

    req.pool.query(deleteQuery, [req.params.id], (error, results) => {
      if (error) {
        console.error("Error deleting contact form entry:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Contact form entry not found" });
      }
      res.json({ message: "Contact form entry deleted successfully" });
    });
  }
);

module.exports = router;
