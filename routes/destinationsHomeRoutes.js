const express = require("express");

const router = express.Router();

/**
 * @swagger
 * /top-destinations:
 *   get:
 *     summary: Get the top 4 locations with the most destinations
 *     tags: [Destinations]
 *     responses:
 *       200:
 *         description: Retrieved successfully
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   location:
 *                     type: string
 *                     example: "Giza"
 *                   destinationCount:
 *                     type: integer
 *                     example: 2
 *                   image:
 *                     type: string
 *                     example: "giza_image_1.jpg"
 *       500:
 *         description: Internal server error
 */

router.get("/top-destinations", (req, res) => {
  const query = `
      SELECT 
        location,
        COUNT(destination_id) AS destinationCount,
        MIN(image) AS image
      FROM destinations
      WHERE visible = 1
      GROUP BY location
      ORDER BY destinationCount DESC
      LIMIT 4
    `;

  req.pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching top Destinations entries:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

module.exports = router;
