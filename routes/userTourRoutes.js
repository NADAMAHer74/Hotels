const express = require("express");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/token");
const userRoutes = require("./userRoutes");
const router = express.Router();

/**
 * @swagger
 * /user_tours:
 *   post:
 *     summary: Create a new user tour
 *     tags: [User Tours]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tour_id:
 *                 type: integer
 *               adult_quantity:
 *                 type: integer
 *               kids_quantity:
 *                 type: integer
 *               child_quantity:
 *                 type: integer
 *               additional_service_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: User tour created successfully
 */
router.post("/user_tours", verifyToken, (req, res) => {
  console.log("User ID:", req.user.userId);
  const {
    tour_id,
    adult_quantity,
    kids_quantity,
    child_quantity,
    additional_service_ids,
  } = req.body;

  if (!tour_id || !adult_quantity || !kids_quantity || !child_quantity) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const insertTourQuery = `
        INSERT INTO user_tours (user_id, tour_id, adult_quantity, kids_quantity, child_quantity)
        VALUES (?, ?, ?, ?, ?)`;

  req.pool.query(
    insertTourQuery,
    [req.user.userId, tour_id, adult_quantity, kids_quantity, child_quantity],
    (error, tourResult) => {
      if (error) {
        console.error("Error inserting tour:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      const userTourId = tourResult.insertId;

      if (additional_service_ids && additional_service_ids.length > 0) {
        const insertServicesQuery = `
          INSERT INTO user_tours_additional_services (user_tour_id, additional_service_id)
          VALUES ?`;
        const values = additional_service_ids.map((id) => [userTourId, id]);

        req.pool.query(insertServicesQuery, [values], (serviceError) => {
          if (serviceError) {
            console.error("Error inserting additional services:", serviceError);
            return res.status(500).json({ message: "Internal server error" });
          }

          res.status(201).json({
            message: "User tour booked successfully",
            trip: {
              data: {
                user_tour_id: userTourId,
                user_id: req.userId,
                tour_id,
                adult_quantity,
                kids_quantity,
                child_quantity,
                created_at: new Date(),
                updated_at: new Date(),
                additional_services: additional_service_ids,
              },
            },
          });
        });
      } else {
        res.status(201).json({
          message: "User tour booked successfully",
          trip: {
            data: {
              user_tour_id: userTourId,
              user_id: req.userId,
              tour_id,
              adult_quantity,
              kids_quantity,
              child_quantity,
              created_at: new Date(),
              updated_at: new Date(),
              additional_services: [],
            },
          },
        });
      }
    }
  );
});

/**
 * @swagger
 * /user_tours:
 *   get:
 *     summary: Get all user tours for the authenticated user
 *     tags: [User Tours]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user tours for the authenticated user
 *       500:
 *         description: Internal server error
 */
router.get("/user_tours", verifyToken, (req, res) => {
  const userId = req.user.userId;

  const query = `
      SELECT ut.*, 
             GROUP_CONCAT(s.service_name) AS additional_services
      FROM user_tours ut
      LEFT JOIN user_tours_additional_services uas ON ut.user_tour_id = uas.user_tour_id
      LEFT JOIN available_additional_services s ON uas.additional_service_id = s.available_additional_service_id
      WHERE ut.user_id = ?
      GROUP BY ut.user_tour_id`;

  req.pool.query(query, [userId], (error, tours) => {
    if (error) {
      console.error("Error fetching user tours:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.json({
      user_tours: tours.map((tour) => ({
        user_tour_id: tour.user_tour_id,
        tour_id: tour.tour_id,
        adult_quantity: tour.adult_quantity,
        kids_quantity: tour.kids_quantity,
        child_quantity: tour.child_quantity,
        created_at: tour.created_at,
        updated_at: tour.updated_at,
        additional_services: tour.additional_services
          ? tour.additional_services.split(",")
          : [],
      })),
    });
  });
});

/**
 * @swagger
 * /user_tours/{id}:
 *   get:
 *     summary: Get user tour by ID
 *     tags: [User Tours]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: User tour details
 *       404:
 *         description: User tour not found
 */
router.get("/user_tours/:id", (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM user_tours WHERE user_tour_id = ?`;

  req.pool.query(query, [id], (error, tourResult) => {
    if (error) {
      console.error("Error fetching user tour:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (tourResult.length === 0) {
      return res.status(404).json({ message: "User tour not found" });
    }

    const additionalServicesQuery = `
        SELECT s.service_name, s.price
        FROM user_tours_additional_services u
        JOIN available_additional_services s ON u.additional_service_id = s.available_additional_service_id
        WHERE u.user_tour_id = ?`;

    req.pool.query(
      additionalServicesQuery,
      [id],
      (error, additionalServices) => {
        if (error) {
          console.error("Error fetching additional services:", error);
          return res.status(500).json({ message: "Internal server error" });
        }

        res.json({
          trip: {
            data: {
              ...tourResult[0],
              additional_services: additionalServices,
            },
          },
        });
      }
    );
  });
});

/**
 * @swagger
 * /user_tours/{id}:
 *   put:
 *     summary: Update user tour by ID
 *     tags: [User Tours]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tour_id:
 *                 type: integer
 *               adult_quantity:
 *                 type: integer
 *               kids_quantity:
 *                 type: integer
 *               child_quantity:
 *                 type: integer
 *               additional_service_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: User tour updated successfully
 *       404:
 *         description: User tour not found
 */
router.put("/user_tours/:id", async (req, res) => {
  const { id } = req.params;
  const {
    tour_id,
    adult_quantity,
    kids_quantity,
    child_quantity,
    additional_service_ids,
  } = req.body;

  try {
    const updateTourQuery = `
      UPDATE user_tours
      SET tour_id = ?, adult_quantity = ?, kids_quantity = ?, child_quantity = ?
      WHERE user_tour_id = ?`;
    const updateResult = await req.pool.query(updateTourQuery, [
      tour_id,
      adult_quantity,
      kids_quantity,
      child_quantity,
      id,
    ]);

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: "User tour not found" });
    }

    if (additional_service_ids) {
      const deleteServicesQuery = `
        DELETE FROM user_tours_additional_services WHERE user_tour_id = ?`;
      await req.pool.query(deleteServicesQuery, [id]);

      if (additional_service_ids.length > 0) {
        const insertServicesQuery = `
          INSERT INTO user_tours_additional_services (user_tour_id, additional_service_id) VALUES ?`;
        const values = additional_service_ids.map((serviceId) => [
          id,
          serviceId,
        ]);
        await req.pool.query(insertServicesQuery, [values]);
      }
    }

    res.json({ message: "User tour updated successfully" });
  } catch (error) {
    console.error("Error updating user tour:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /user_tours/{id}:
 *   delete:
 *     summary: Delete user tour by ID
 *     tags: [User Tours]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: User tour deleted successfully
 *       404:
 *         description: User tour not found
 */
router.delete("/user_tours/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteTourQuery = `
      DELETE FROM user_tours WHERE user_tour_id = ?`;
    const deleteResult = await req.pool.query(deleteTourQuery, [id]);

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: "User tour not found" });
    }

    res.json({ message: "User tour deleted successfully" });
  } catch (error) {
    console.error("Error deleting user tour:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
