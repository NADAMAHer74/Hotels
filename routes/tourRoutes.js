const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /tours:
 *   post:
 *     summary: Create a new tour
 *     tags: [Tours]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
 *       500:
 *         description: Internal server error
 */
router.post("/tours", async (req, res) => {
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
    tourImage,
    date,
    time,
    miniAge,
    maxGusts,
    languagesSupport,
  } = req.body;

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
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({
          message: "Tour created successfully",
          tourId: results.insertId,
        });
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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
    res.json(results);
  });
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
    res.json(results[0]);
  });
});

/**
 * @swagger
 * /tours/{tour_id}:
 *   delete:
 *     summary: Delete tour by ID
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
 *         description: Tour deleted successfully
 *       404:
 *         description: Tour not found
 */
router.delete("/tours/:tour_id", (req, res) => {
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
});

/**
 * @swagger
 * /tours/{tour_id}:
 *   put:
 *     summary: Update tour by ID
 *     tags: [Tours]
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
 *         application/json:
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
router.put("/tours/:tour_id", (req, res) => {
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
      tourImage,
      date,
      time,
      miniAge,
      maxGusts,
      languagesSupport,
    } = req.body;

    // Create arrays to hold the update fields and their values
    const updates = [];
    const updateFields = [];

    // Check which fields are provided and build the update query dynamically
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
    if (tourImage) {
      updates.push(tourImage);
      updateFields.push("tourImage = ?");
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

    // If no fields are provided, return an error
    if (updates.length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    // Build the final query string with placeholders
    const query = `
      UPDATE tours SET 
        ${updateFields.join(", ")} 
      WHERE tour_id = ?
    `;

    // Add the tour_id to the end of the values array
    updates.push(req.params.tour_id);

    req.pool.query(query, updates, (error, results) => {
      if (error) {
        console.error("Error updating tour:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Tour not found" });
      }
      res.json({ message: "Tour updated successfully" });
    });
  } catch (error) {
    console.error("Error in request:", error);
    return res.status(400).json({ message: "Invalid request." });
  }
});

module.exports = router;
