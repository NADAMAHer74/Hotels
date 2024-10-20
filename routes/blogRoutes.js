const express = require("express");
const multer = require("multer");
const path = require("path");

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
 * /blogs:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author_id:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *       400:
 *         description: Error creating blog post
 */
router.post("/blogs", upload.single("imageUrl"), (req, res) => {
  const { title, content, author_id } = req.body;
  const imageUrl = req.file ? req.file.path : null;

  const insertBlogQuery =
    "INSERT INTO blogs (title, content, author_id, imageUrl) VALUES (?, ?, ?, ?)";
  req.pool.query(
    insertBlogQuery,
    [title, content, author_id, imageUrl],
    (error, results) => {
      if (error) {
        console.error("Error inserting blog post:", error);
        return res
          .status(400)
          .json({ message: "Error creating blog post", error });
      }
      res.status(201).json({
        message: "Blog post created successfully",
        blogId: results.insertId,
      });
    }
  );
});

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: A list of blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   author_id:
 *                     type: integer
 *                   imageUrl:
 *                     type: string
 */
router.get("/blogs", (req, res) => {
  const query = "SELECT * FROM blogs";
  req.pool.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The blog post ID
 *     responses:
 *       200:
 *         description: Blog post details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 author_id:
 *                   type: integer
 *                 imageUrl:
 *                   type: string
 *       404:
 *         description: Blog post not found
 */
router.get("/blogs/:id", (req, res) => {
  const query = "SELECT * FROM blogs WHERE blog_id = ?";
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(results[0]);
  });
});

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Update a blog post by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The blog post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author_id:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *       404:
 *         description: Blog post not found
 */
router.put("/blogs/:id", upload.single("imageUrl"), (req, res) => {
  const { title, content, author_id } = req.body;
  const imageUrl = req.file ? req.file.path : null;

  const updateFields = [];
  const updates = [];

  if (title) {
    updates.push(title);
    updateFields.push("title = ?");
  }
  if (content) {
    updates.push(content);
    updateFields.push("content = ?");
  }
  if (author_id) {
    updates.push(author_id);
    updateFields.push("author_id = ?");
  }
  if (imageUrl) {
    updates.push(imageUrl);
    updateFields.push("imageUrl = ?");
  }

  updates.push(req.params.id);
  const query = `UPDATE blogs SET ${updateFields.join(", ")} WHERE blog_id = ?`;

  req.pool.query(query, updates, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json({ message: "Blog post updated successfully" });
  });
});

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The blog post ID
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 *       404:
 *         description: Blog post not found
 */
router.delete("/blogs/:id", (req, res) => {
  const query = "DELETE FROM blogs WHERE blog_id = ?";
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json({ message: "Blog post deleted successfully" });
  });
});

/**
 * @swagger
 * /pagination:
 *   get:
 *     summary: Get all blog posts with pagination
 *     tags: [Blogs]
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
 *         description: Number of blog posts to retrieve per page (default is 6)
 *     responses:
 *       200:
 *         description: A list of blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   author_id:
 *                     type: integer
 *                   imageUrl:
 *                     type: string
 */
router.get("/pagination", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;

  const query = "SELECT * FROM blogs LIMIT ? OFFSET ?";
  req.pool.query(query, [limit, offset], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json({
      page,
      limit,
      blogs: results,
    });
  });
});

module.exports = router;
