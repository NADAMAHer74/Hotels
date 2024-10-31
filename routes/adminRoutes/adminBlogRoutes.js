const express = require("express");
const multer = require("multer");
const path = require("path");
const { verifyToken, checkRole } = require("../../middlewares/token");


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

router.post(
  "/admin/blogs",
  verifyToken,
  checkRole(["Admin"]),
  upload.single("imageUrl"),
  (req, res) => {
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

        res.status(201).redirect("/api/blogs");
      }
    );
  }
);

router.get("/admin/blogs/new", async (req, res) => {
  // Pass authors to the template along with an empty course object

  res.render("addBlog", { blog: {} });
});


router.get("/admin/blogs", (req, res) => {
  const query = "SELECT * FROM blogs";
  req.pool.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.render("blogs", { blogs: results });
  });
});
 

router.get("/admin/blogs/:id", (req, res) => {
  const query = "SELECT * FROM blogs WHERE blog_id = ?";
  req.pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.render("viewBlog", { blog: results[0] });
  });
});


router.put(
  "/admin/blogs/:id",
  verifyToken,
  checkRole(["Admin"]),
  upload.single("imageUrl"),
  (req, res) => {
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
    const query = `UPDATE blogs SET ${updateFields.join(
      ", "
    )} WHERE blog_id = ?`;

    req.pool.query(query, updates, (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json({ message: "Blog post updated successfully" });
    });
  }
);

router.get("/admin/blogs/:blog_id/edit", async (req, res) => {
  const query = "SELECT * FROM blogs WHERE blog_id = ?";
  req.pool.query(query, [req.params.blog_id], (error, results) => {
    if (error) {
      console.error("Error fetching blog post:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }
    // res.json(results[0]);
    res.render("editBlog", { blog: results[0] });
  });
});


router.delete("/admin/blogs/:id", verifyToken, checkRole(["Admin"]), (req, res) => {
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



module.exports = router;
