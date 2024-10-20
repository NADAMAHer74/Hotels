const express = require("express");
const connection = require("./config/database"); // Import your database connection
const ContactUsForm = require('./models/ContactUsForm'); 
const app = express();
app.use(express.json());

// Define routes for contact form
const router = express.Router();

// Create a new contact form entry
router.post('/contactus', async (req, res) => {
  try {
    const newForm = await ContactUsForm.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,
    });

    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contact form entry' });
  }
});

// Get all contact form entries
router.get('/contactus', async (req, res) => {
  try {
    const forms = await ContactUsForm.findAll();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact form entries' });
  }
});

// Use the router
app.use('/api', router);

// Route to get all users
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users"; // SQL query to fetch all users

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results); // Send the results as a JSON response
  });
});

// Check database connection once when the server starts
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database...");

  // Start the server after a successful database connection
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});
