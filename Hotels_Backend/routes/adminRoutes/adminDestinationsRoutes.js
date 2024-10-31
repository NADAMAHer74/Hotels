const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const { verifyToken, checkRole } = require("../../middlewares/token");

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

router.post(
  "/admin/destinations",
  verifyToken,
  checkRole(["Admin"]),
  upload.single("image"),
  (req, res) => {
    const { name, location, category, visible } = req.body;
    const image = req.file ? req.file.path : null;
    const insertQuery = `INSERT INTO destinations (name, location,category, image, visible) VALUES (?, ?, ?, ?, ?)`;

    req.pool.query(
      insertQuery,
      [name, location, category, image, visible],
      (error, results) => {
        if (error) {
          console.error("Error inserting destination entry:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).redirect("/api/admin/destinations");

        // res
        //   .status(201)
        //   .json({ message: "Destination entry created successfully" });
      }
    );
  }
);

router.get("/admin/destinations", (req, res) => {
  const query = "SELECT * FROM destinations";

  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching destination entries:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    //res.json(results);
    res.render("destinations", { destinations: results });
  });
});
router.get("/admin/destinations/new", async (req, res) => {
  // Pass authors to the template along with an empty course object

  res.render("addDestination", { destination: {} });
});

router.get("/admin/destinations/:id", (req, res) => {
  const query = "SELECT * FROM destinations WHERE destination_id = ?";

  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching destination entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Destination entry not found" });
    }
    // res.json(results[0]);
    res.render("viewDestination", { destination: results[0] });
  });
});

router.get("/admin/destinations/:id/edit", async (req, res) => {
  const query = "SELECT * FROM destinations WHERE destination_id = ?";
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error fetching destination entry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Destination entry not found" });
    }
    // res.json(results[0]);
    res.render("editDestination", { destination: results[0] });
  });
});

router.put(
  "/admin/destinations/:id",
  verifyToken,
  checkRole(["Admin"]),
  upload.single("image"),
  (req, res) => {
    const { name, category, location, visible } = req.body;
    const image = req.file ? req.file.path : null;
    const updateQuery = `UPDATE destinations SET name = ?, category = ?, location = ?, image = ?, visible = ? WHERE destination_id = ?`;

    req.pool.query(
      updateQuery,
      [name, category, location, image, visible, req.params.id],
      (error, results) => {
        if (error) {
          console.error("Error updating destination entry:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "Destination entry not found" });
        }
        res.json({ message: "Destination entry updated successfully" });
      }
    );
  }
);

router.delete(
  "/admin/destinations/:id",
  verifyToken,
  checkRole(["Admin"]),
  (req, res) => {
    const deleteQuery = "DELETE FROM destinations WHERE destination_id = ?";

    req.pool.query(deleteQuery, [req.params.id], (error, results) => {
      if (error) {
        console.error("Error deleting destination entry:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Destination entry not found" });
      }
      res.json({ message: "Destination entry deleted successfully" });
    });
  }
);

module.exports = router;
