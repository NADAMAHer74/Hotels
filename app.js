const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser"); // Import cookie-parser

const userRoutes = require("./routes/userRoutes");
const tourRoutes = require("./routes/tourRoutes");
const userTourRoutes = require("./routes/userTourRoutes");
const availableServicesRoutes = require("./routes/availableServicesRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contactUsRoutes = require("./routes/contactUsRoutes");
const phoneRoutes = require("./routes/phoneRoutes");
const locationRoutes = require("./routes/locationRoutes");
const destinationsRoutes = require("./routes/destinationsRoutes");
const workingHoursRoutes = require("./routes/workingHoursRoutes");
const AmenitiesRoutes = require("./routes/AmenitiesRoutes");
const toursHasAmenitiesRoutes = require("./routes/toursHasAmenitiesRoutes");
const PagesRoutes = require("./routes/PagesRoutes");
const BannersRoutes = require("./routes/BannersRoutes");
const topnavbar = require("./routes/topnavbar");
const statistics = require("./routes/statistics");
const emails = require("./routes/emails");
const aboutUSRoutes = require("./routes/aboutUSRoutes");
const WhatToDoRoutes = require("./routes/WhatToDoRoutes");
const destinationsHomeRoutes = require("./routes/destinationsHomeRoutes");
const aboutUsImagesRoutes = require("./routes/aboutUsImagesRoutes");
const WhatToDoImagesRoutes = require("./routes/WhatToDoImagesRoutes");
const servicesRoutes = require("./routes/WhatToDoImagesRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { createTables } = require("./migrations/migrate");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const pool = mysql.createPool({
  connectionLimit: 20,
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
app.use((req, res, next) => {
  req.pool = pool;
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
        url: "http://localhost:2000/api",
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
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  "/adminLte",
  express.static(path.join(__dirname, "node_modules", "admin-lte"))
);
app.use(
  "/fontAwesome",
  express.static(
    path.join(__dirname, "node_modules", "@fortawesome", "fontawesome-free")
  )
);

app.set("view engine", "ejs");

app.use("/api", userRoutes);
app.use("/api", blogRoutes);
app.use("/api", tourRoutes);
app.use("/api", userTourRoutes);
app.use("/api", availableServicesRoutes);

app.use("/api", contactUsRoutes);

app.use("/api", phoneRoutes);
app.use("/api", locationRoutes);
app.use("/api", workingHoursRoutes);
app.use("/api", destinationsRoutes);
app.use("/api", AmenitiesRoutes);
app.use("/api", toursHasAmenitiesRoutes);
app.use("/api", PagesRoutes);
app.use("/api", BannersRoutes);
app.use("/api", topnavbar);
app.use("/api", statistics);
app.use("/api", emails);
app.use("/api", destinationsHomeRoutes);
app.use("/api", aboutUsImagesRoutes);
app.use("/api", aboutUSRoutes);
app.use("/api", WhatToDoImagesRoutes);
app.use("/api", WhatToDoRoutes);
app.use("/api", servicesRoutes);
app.get("/signin", (req, res) => {
  res.render("signin");
});
// app.get("/api/tours/new", (req, res) => {
//   res.render("addTour");
// });
// app.get("/tours", (req, res) => {
//   res.render("tours");
// });

app.listen(2000, () => {
  console.log("Server running on port 2000");
  console.log("Swagger running at http://localhost:2000/api-docs");
});
