const express = require("express");
const mysql = require("mysql");
const userRoutes = require("./routes/userRoutes");
const tourRoutes = require("./routes/tourRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { createTables } = require("./migrations/migrate");

const app = express();
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost", // your database host
  user: "root", // your database username
  database: "Hotels", // your database name
});

// Connect to the database and create tables
pool.getConnection((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the database");

  // Run the migration to create tables
  createTables(pool); // Pass the pool to the createTables function
});

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Hotels API",
      version: "1.0.0",
      description: "API for managing hotels",
    },
    servers: [
      {
        url: "http://localhost:3000/api", // Base URL for your API
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your API files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware to attach pool to each request
app.use((req, res, next) => {
  req.pool = pool; // Attach the pool to the request
  next();
});

// Use user routes
app.use("/api", userRoutes);
app.use("/api", tourRoutes);
// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log("Swagger running at http://localhost:3000/api-docs");
});
