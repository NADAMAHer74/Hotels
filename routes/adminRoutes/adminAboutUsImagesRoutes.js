const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const { verifyToken, checkRole } = require("../../middlewares/token");
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

router.post(
  "/admin/aboutusimages",
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

router.get("/admin/aboutusimages", (req, res) => {
  const query = "SELECT * FROM AboutUsImages";

  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching About Us Images:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    // res.json(results);
    // console.log(results);
    res.render("aboutUsImages", { aboutusimages: results });
  });
});

router.get("/admin/aboutusimages/:id", (req, res) => {
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
    // res.json(results[0]);
    res.render("viewAboutUsImage", { image: results[0] });
  });
});

router.put(
  "/admin/aboutusimages/:id",
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

router.put(
  "/admin/switch-visibility",
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
router.delete(
  "/admin/aboutusimages/:id",
  verifyToken,
  checkRole(["Admin"]),
  (req, res) => {
    const deleteQuery = "DELETE FROM AboutUsImages WHERE AboutUsImages_ID = ?";

    req.pool.query(deleteQuery, [req.params.id], (error, results) => {
      if (error) {
        console.error("Error deleting AboutUsImages entry:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Email AboutUsImages not found" });
      }
      res.json({ message: "AboutUsImages entry deleted successfully" });
    });
  }
);

router.put(
  "/admin/aboutusimages/visible/:id",
  verifyToken,
  checkRole(["Admin"]),
  (req, res) => {
    const { visible } = req.body;
    const updateQuery = `
    UPDATE AboutUsImages 
    SET visible = ? 
    WHERE AboutUsImages_ID = ?
  `;

    req.pool.query(updateQuery, [visible, req.params.id], (error, results) => {
      if (error) {
        console.error("Error updating visibility:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "About Us image entry not found" });
      }
      res.json({ message: "Visibility updated successfully" });
    });
  }
);

router.put(
  "/admin/aboutusimages/image/:id",
  verifyToken,
  checkRole(["Admin"]),
  (req, res) => {
    const { image } = req.body;
    const updateQuery = `UPDATE AboutUs SET image = ? WHERE AboutUsImages_ID = ?`; // Assuming ID 1 for single row
    req.pool.query(updateQuery, [image, req.params.id], (error, results) => {
      if (error) {
        console.error("Error updating About Us image:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "About Us image entry not found" });
      }
      res.json({ message: "About Us image updated successfully" });
    });
  }
);

module.exports = router;
