// migrations/migrate.js
const mysql = require("mysql");
const connection = require("../config/database"); // Import the database connection

// Function to create tables
const createTables = () => {
  // SQL queries to create tables
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  const createToursTable = `
    CREATE TABLE IF NOT EXISTS tours (
        tour_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        tour_name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  const createUserToursTable = `
    CREATE TABLE IF NOT EXISTS user_tours (
        user_tour_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNSIGNED NOT NULL,
        tour_id INT UNSIGNED NOT NULL,
        adult_quantity INT DEFAULT NULL,
        kids_quantity INT DEFAULT NULL,
        child_quantity INT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (tour_id) REFERENCES tours(tour_id) ON DELETE CASCADE
    );
  `;

  const createAvailableAdditionalServicesTable = `
    CREATE TABLE IF NOT EXISTS available_additional_services (
        available_additional_service_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        service_name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  const createUserToursAdditionalServicesTable = `
    CREATE TABLE IF NOT EXISTS user_tours_additional_services (
        user_tour_id INT UNSIGNED NOT NULL,
        additional_service_id INT UNSIGNED NOT NULL,
        PRIMARY KEY (user_tour_id, additional_service_id),
        FOREIGN KEY (user_tour_id) REFERENCES user_tours(user_tour_id) ON DELETE CASCADE,
        FOREIGN KEY (additional_service_id) REFERENCES available_additional_services(available_additional_service_id) ON DELETE CASCADE
    );
  `;

  const createBlogsTable = `
    CREATE TABLE IF NOT EXISTS blogs (
        blog_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author_id INT UNSIGNED NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  const createReviewsTable = `
    CREATE TABLE IF NOT EXISTS reviews (
        review_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        tour_id INT UNSIGNED NOT NULL,
        user_id INT UNSIGNED NOT NULL,
        rating INT CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (tour_id) REFERENCES tours(tour_id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  // Array of queries to execute
  const queries = [
    createUsersTable,
    createToursTable,
    createUserToursTable,
    createAvailableAdditionalServicesTable,
    createUserToursAdditionalServicesTable,
    createBlogsTable,
    createReviewsTable,
  ];

  // Execute each query
  queries.forEach((query, index) => {
    connection.query(query, (error) => {
      if (error) {
        console.error(`Error creating table ${index + 1}:`, error);
      } else {
        console.log(`Table ${index + 1} created or already exists`);
      }
    });
  });

  // Close the connection after all queries
  connection.end();
};

// Call the function to create tables
createTables();
