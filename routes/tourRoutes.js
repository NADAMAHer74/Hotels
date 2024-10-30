const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const { verifyToken, checkRole } = require("../middlewares/token");

const router = express.Router();

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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /tours:
 *   post:
 *     summary: Create a new tour
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *               name:
 *                 type: string
 *               adultPrice:
 *                 type: number
 *               kidsPrice:
 *                 type: number
 *               childrenPrice:
 *                 type: number
 *               durationInDays:
 *                 type: integer
 *               type:
 *                 type: string
 *               reviewStars:
 *                 type: integer
 *               overview:
 *                 type: string
 *               tourImage:
 *                 type: string
 *                 format: binary
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: time
 *               miniAge:
 *                 type: integer
 *               maxGusts:
 *                 type: integer
 *               languagesSupport:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tour created successfully
 *       400:
 *         description: Error creating tour
 */
router.post(
  "/tours",
  verifyToken,
  checkRole(["Admin"]),
  upload.single("tourImage"),
  async (req, res) => {
    const {
      location,
      name,
      adultPrice,
      kidsPrice,
      childrenPrice,
      durationInDays,
      type,
      reviewStars,
      overview,
      date,
      time,
      miniAge,
      maxGusts,
      languagesSupport,
    } = req.body;

    const tourImage = req.file ? req.file.path : null;

    try {
      console.log("Received tour creation request:", req.body);

      const insertTourQuery =
        "INSERT INTO tours (location, name, adultPrice, kidsPrice, childrenPrice, durationInDays, type, reviewStars, overview, tourImage, date, time, miniAge, maxGusts, languagesSupport) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      req.pool.query(
        insertTourQuery,
        [
          location,
          name,
          adultPrice,
          kidsPrice,
          childrenPrice,
          durationInDays,
          type,
          reviewStars,
          overview,
          tourImage,
          date,
          time,
          miniAge,
          maxGusts,
          languagesSupport,
        ],
        (error, results) => {
          if (error) {
            console.error("Error inserting tour:", error);
            return res
              .status(400)
              .json({ message: "Error creating tour", error });
          }
           //status(201).redirect("/api/tours"); 
           res.json({
            message: "Tour created successfully",

            tourId: results.insertId,
          });
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

/**
 * @swagger
 * /tours:
 *   get:
 *     summary: Get all tours
 *     tags: [Tours]
 *     responses:
 *       200:
 *         description: A list of tours
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/tours", (req, res) => {
  const query = "SELECT * FROM tours";
  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching tours:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.render("tours", { tours: results });
  });
});

router.get("/tours/new", async (req, res) => {
  // Pass authors to the template along with an empty course object

  res.render("addTour", { tour: {} });
});

/**
 * @swagger
 * /tours/{tour_id}:
 *   get:
 *     summary: Get tour by ID
 *     tags: [Tours]
 *     parameters:
 *       - in: path
 *         name: tour_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The tour ID
 *     responses:
 *       200:
 *         description: Tour details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Tour not found
 */
router.get("/tours/:tour_id", (req, res) => {
  const query = "SELECT * FROM tours WHERE tour_id = ?";
  req.pool.query(query, [req.params.tour_id], (error, results) => {
    if (error) {
      console.error("Error fetching tour:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Tour not found" });
    }
    // res.json(results[0]);
    res.render("viewTour", { tour: results[0] });
  });
});

router.get("/tours/:tour_id/edit", async (req, res) => {
  const query = "SELECT * FROM tours WHERE tour_id = ?";
  req.pool.query(query, [req.params.tour_id], (error, results) => {
    if (error) {
      console.error("Error fetching tour:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Tour not found" });
    }
    // res.json(results[0]);
    res.render("editTour", { tour: results[0] });
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
 *
 * /tours/{tour_id}:
 *   delete:
 *     summary: Delete tour by ID
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tour_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The tour ID
 *     responses:
 *       200:
 *         description: Tour deleted successfully
 *       404:
 *         description: Tour not found
 */
router.delete(
  "/tours/:tour_id",
  verifyToken,
  checkRole(["Admin"]),
  (req, res) => {
    const query = "DELETE FROM tours WHERE tour_id = ?";
    req.pool.query(query, [req.params.tour_id], (error, results) => {
      if (error) {
        console.error("Error deleting tour:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Tour not found" });
      }
      res.json({ message: "Tour deleted successfully" });
    });
  }
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /tours/{tour_id}:
 *   put:
 *     summary: Update tour by ID
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tour_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The tour ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *               name:
 *                 type: string
 *               adultPrice:
 *                 type: number
 *               kidsPrice:
 *                 type: number
 *               childrenPrice:
 *                 type: number
 *               durationInDays:
 *                 type: integer
 *               type:
 *                 type: string
 *               reviewStars:
 *                 type: integer
 *               overview:
 *                 type: string
 *               tourImage:
 *                 type: string
 *                 format: binary
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: time
 *               miniAge:
 *                 type: integer
 *               maxGusts:
 *                 type: integer
 *               languagesSupport:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tour updated successfully
 *       404:
 *         description: Tour not found
 */
// router.put("/tours/:tour_id", verifyToken, checkRole(["Admin"]), (req, res) => {
//   try {
//     const {
//       location,
//       name,
//       adultPrice,
//       kidsPrice,
//       childrenPrice,
//       durationInDays,
//       type,
//       reviewStars,
//       overview,
//       tourImage,
//       date,
//       time,
//       miniAge,
//       maxGusts,
//       languagesSupport,
//     } = req.body;

//     console.log(req.body);
//     const updates = [];
//     const updateFields = [];

//     if (location) {
//       updates.push(location);
//       updateFields.push("location = ?");
//     }
//     if (name) {
//       updates.push(name);
//       updateFields.push("name = ?");
//     }
//     if (adultPrice) {
//       updates.push(adultPrice);
//       updateFields.push("adultPrice = ?");
//     }
//     if (kidsPrice) {
//       updates.push(kidsPrice);
//       updateFields.push("kidsPrice = ?");
//     }
//     if (childrenPrice) {
//       updates.push(childrenPrice);
//       updateFields.push("childrenPrice = ?");
//     }
//     if (durationInDays) {
//       updates.push(durationInDays);
//       updateFields.push("durationInDays = ?");
//     }
//     if (type) {
//       updates.push(type);
//       updateFields.push("type = ?");
//     }
//     if (reviewStars) {
//       updates.push(reviewStars);
//       updateFields.push("reviewStars = ?");
//     }
//     if (overview) {
//       updates.push(overview);
//       updateFields.push("overview = ?");
//     }
//     if (tourImage) {
//       updates.push(tourImage);
//       updateFields.push("tourImage = ?");
//     }
//     if (date) {
//       updates.push(date);
//       updateFields.push("date = ?");
//     }
//     if (time) {
//       updates.push(time);
//       updateFields.push("time = ?");
//     }
//     if (miniAge) {
//       updates.push(miniAge);
//       updateFields.push("miniAge = ?");
//     }
//     if (maxGusts) {
//       updates.push(maxGusts);
//       updateFields.push("maxGusts = ?");
//     }
//     if (languagesSupport) {
//       updates.push(languagesSupport);
//       updateFields.push("languagesSupport = ?");
//     }

//     const sqlQuery = `
//       UPDATE tours
//       SET  ${updateFields.join(", ")}
//       WHERE tour_id = ?
//     `;
//     updates.push(req.params.tour_id);
//     console.log(req.body);

//     req.pool.query(sqlQuery, updates, (error, results) => {
//       if (error) {
//         console.error("Error updating tour:", error);
//         return res.status(400).json({ message: "Error updating tour", error });
//       }
//       if (results.affectedRows === 0) {
//         return res.status(404).json({ message: "Tour not found" });
//       }
//       res.json({ message: "Tour updated successfully" });
//     });
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

router.put(
  "/tours/:tour_id",
  verifyToken,
  checkRole(["Admin"]),
  upload.single("tourImage"), // Middleware to handle file upload
  (req, res) => {
    try {
      const {
        location,
        name,
        adultPrice,
        kidsPrice,
        childrenPrice,
        durationInDays,
        type,
        reviewStars,
        overview,
        date,
        time,
        miniAge,
        maxGusts,
        languagesSupport,
      } = req.body;
      const tourImage = req.file ? req.file.path : null;

      const updates = [];
      const updateFields = [];

      // Add fields to updates and updateFields if they are present in the request
      if (location) {
        updates.push(location);
        updateFields.push("location = ?");
      }
      if (name) {
        updates.push(name);
        updateFields.push("name = ?");
      }
      if (adultPrice) {
        updates.push(adultPrice);
        updateFields.push("adultPrice = ?");
      }
      if (kidsPrice) {
        updates.push(kidsPrice);
        updateFields.push("kidsPrice = ?");
      }
      if (childrenPrice) {
        updates.push(childrenPrice);
        updateFields.push("childrenPrice = ?");
      }
      if (durationInDays) {
        updates.push(durationInDays);
        updateFields.push("durationInDays = ?");
      }
      if (type) {
        updates.push(type);
        updateFields.push("type = ?");
      }
      if (reviewStars) {
        updates.push(reviewStars);
        updateFields.push("reviewStars = ?");
      }
      if (overview) {
        updates.push(overview);
        updateFields.push("overview = ?");
      }
      if (date) {
        updates.push(date);
        updateFields.push("date = ?");
      }
      if (time) {
        updates.push(time);
        updateFields.push("time = ?");
      }
      if (miniAge) {
        updates.push(miniAge);
        updateFields.push("miniAge = ?");
      }
      if (maxGusts) {
        updates.push(maxGusts);
        updateFields.push("maxGusts = ?");
      }
      if (languagesSupport) {
        updates.push(languagesSupport);
        updateFields.push("languagesSupport = ?");
      }

      // Check if a new image file is uploaded
/*       if (req.file) {
        const tourImage = req.file ? req.file.path : null;
        updates.push(tourImage);
        updateFields.push("tourImage = ?");
      } */
      updates.push(tourImage);
      updateFields.push("tourImage = ?");


      // Construct the SQL query with dynamic updates
      const sqlQuery = `
        UPDATE tours
        SET ${updateFields.join(", ")}
        WHERE tour_id = ?
      `;

      // Add the tour ID to the updates array for the WHERE clause
      updates.push(req.params.tour_id);

      // Execute the query
      req.pool.query(sqlQuery, updates, (error, results) => {
        if (error) {
          console.error("Error updating tour:", error);
          return res
            .status(400)
            .json({ message: "Error updating tour", error });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Tour not found" });
        }
        res.json({ message: "Tour updated successfully" });
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

/**
 * @swagger
 * /paginationOfTours:
 *   get:
 *     summary: Get all tours with pagination
 *     tags: [Tours]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of tours to retrieve per page (default is 6)
 *     responses:
 *       200:
 *         description: A list of tours posts
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 tour_id:
 *                   type: integer
 *               location:
 *                 type: string
 *               name:
 *                 type: string
 *               adultPrice:
 *                 type: number
 *               kidsPrice:
 *                 type: number
 *               childrenPrice:
 *                 type: number
 *               durationInDays:
 *                 type: integer
 *               typeoftour:
 *                 type: string
 *               reviewStars:
 *                 type: integer
 *               overview:
 *                 type: string
 *               tourImage:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: time
 *               miniAge:
 *                 type: integer
 *               maxGusts:
 *                 type: integer
 *               languagesSupport:
 *                 type: string
 *
 */
router.get("/paginationOfTours", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;

  const query = "SELECT * FROM tours LIMIT ? OFFSET ?";
  req.pool.query(query, [limit, offset], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json({
      page,
      limit,
      tours: results,
    });
  });
});

/**
 * @swagger
 * /latestTours:
 *   get:
 *     summary: Get the latest tours
 *     tags: [Tours]
 *     responses:
 *       200:
 *         description: A list of the latest tours
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 tour_id:
 *                   type: integer
 *               location:
 *                 type: string
 *               name:
 *                 type: string
 *               adultPrice:
 *                 type: number
 *               kidsPrice:
 *                 type: number
 *               childrenPrice:
 *                 type: number
 *               durationInDays:
 *                 type: integer
 *               typeoftour:
 *                 type: string
 *               reviewStars:
 *                 type: integer
 *               overview:
 *                 type: string
 *               tourImage:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: time
 *               miniAge:
 *                 type: integer
 *               maxGusts:
 *                 type: integer
 *               languagesSupport:
 *                 type: string
 *
 */
router.get("/latestTours", (req, res) => {
  const query = "SELECT * FROM tours ORDER BY created_at DESC LIMIT 3";

  req.pool.query(query, (error, tours) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    console.log("Tours result:", tours);

    if (!tours || tours.length === 0) {
      return res.status(404).json({ message: "tours not found" });
    }

    res.json(tours);
  });
});
module.exports = router;
