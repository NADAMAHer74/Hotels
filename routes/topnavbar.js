const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Navbar
 *   description: API to fetch navbar data
 */

/**
 * @swagger
 * /navbar:
 *   get:
 *     summary: Get the first visible email, location, and phone for the navbar
 *     tags: [Navbar]
 *     responses:
 *       200:
 *         description: Navbar data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 location:
 *                   type: string
 *                 phone:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.get("/topnavbar", (req, res) => {
    console.log("topnavbar");
  const emailQuery = "SELECT email FROM emails WHERE visible = 1 LIMIT 1";
  const locationQuery = "SELECT location FROM locations WHERE visible = 1 LIMIT 1";
  const phoneQuery = "SELECT phone_number FROM phones WHERE visible = 1 LIMIT 1";

  // Fetch the first visible email
  req.pool.query(emailQuery, (err, emailResults) => {
    if (err) {
      console.error("Error fetching email:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    console.log(emailResults);
    // Fetch the first visible location
    req.pool.query(locationQuery, (err, locationResults) => {
      if (err) {
        console.error("Error fetching location:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      console.log(locationResults);

      // Fetch the first visible phone
      req.pool.query(phoneQuery, (err, phoneResults) => {
        if (err) {
          console.error("Error fetching phone:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        console.log(phoneResults);

        // Combine the results and send the response
        res.json({
          email: emailResults[0] ? emailResults[0].email : null,
          location: locationResults[0] ? locationResults[0].location : null,
          phone: phoneResults[0] ? phoneResults[0].phone_number : null,
        });
      });
    });
  });
});

module.exports = router;
