const express = require("express");
const mysql = require("mysql2");
const userRoutes = require("./routes/userRoutes");
const tourRoutes = require("./routes/tourRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contactUsRoutes = require("./routes/contactUsRoutes");
const phoneRoutes = require("./routes/phoneRoutes");
const locationRoutes = require("./routes/locationRoutes");
const destinationsRoutes = require("./routes/destinationsRoutes");
const workingHoursRoutes = require("./routes/workingHoursRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { createTables } = require("./migrations/migrate");

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  database: "Hotels",
});

pool.getConnection((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the database");

  createTables(pool);
});

// Middleware to attach pool to each request
app.use((req, res, next) => {
  req.pool = pool; // Attach the pool to the request
  next();
});

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Hotels API",
      version: "1.0.0",
      description: "API for managing hotels, users, tours, and contact forms",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Use the user routes
app.use("/api", userRoutes);
app.use("/api", blogRoutes);
app.use("/api", tourRoutes);

// Use the contact us routes
app.use("/api", contactUsRoutes);

app.use("/api", phoneRoutes);
app.use("/api", locationRoutes);
app.use("/api", workingHoursRoutes);
app.use("/api", destinationsRoutes);
// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log("Swagger running at http://localhost:3000/api-docs");
});
