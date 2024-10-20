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

  const createAmenitiesTable = `
  CREATE TABLE IF NOT EXISTS amenities (
        amenities_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(70) NOT NULL,
        icon VARCHAR(100) NOT NULL,
        rate INT
    );
  `;

  const createToursAmenitiesTable = `
  CREATE TABLE IF NOT EXISTS tours_has_amenities (
      tours_tour_id INT UNSIGNED NOT NULL,
      amenities_amenities_id INT UNSIGNED NOT NULL,
      available TINYINT NOT NULL,
      PRIMARY KEY (tours_tour_id, amenities_amenities_id),
      FOREIGN KEY (tours_tour_id) REFERENCES tours(tour_id) ON DELETE CASCADE,
      FOREIGN KEY (amenities_amenities_id) REFERENCES amenities(amenities_id) ON DELETE CASCADE
    );
  `;

  const createPagesTable = `
  CREATE TABLE IF NOT EXISTS pages (
      page_id VARCHAR(20) NOT NULL PRIMARY KEY,
      page_name VARCHAR(45) NOT NULL UNIQUE
    );
  `;

  const createBannersTable = `
  CREATE TABLE IF NOT EXISTS banners (
      banner_id INT AUTO_INCREMENT PRIMARY KEY,
      image MEDIUMTEXT NOT NULL,
      head VARCHAR(200) NOT NULL,
      pages_page_id VARCHAR(20) NOT NULL,
      FOREIGN KEY (pages_page_id) REFERENCES pages(page_id) ON DELETE CASCADE
    );
  `;

  const createPhonesTable = `
  CREATE TABLE IF NOT EXISTS phones (
      phone_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      phone_number VARCHAR(15) NOT NULL,
      visible TINYINT NOT NULL
    );
  `;

  const createLocationsTable = `
  CREATE TABLE IF NOT EXISTS locations (
      location_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      location VARCHAR(250) NOT NULL,
      visible TINYINT NOT NULL
    );
  `;

  const createWorkingHoursTable = `
  CREATE TABLE IF NOT EXISTS working_hours (
      working_hours_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      start_day VARCHAR(45) NOT NULL,
      end_day VARCHAR(45),
      start_hour TIME NOT NULL,
      end_hour TIME NOT NULL,
      visible TINYINT NOT NULL
    );
  `;

  const createContactUsFormTable = `
  CREATE TABLE IF NOT EXISTS contact_us_form (
      form_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(250) NOT NULL,
      phone VARCHAR(15) NOT NULL,
      subject VARCHAR(100) NOT NULL,
      message TEXT NOT NULL
    );
  `;

  const createDestinationsTable = `
  CREATE TABLE IF NOT EXISTS destinations (
      destination_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(250) NOT NULL,
      category VARCHAR(100) NOT NULL,
      image MEDIUMTEXT NOT NULL,
      visible TINYINT NOT NULL
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
    createAmenitiesTable,
    createToursAmenitiesTable,
    createPagesTable,
    createBannersTable,
    createPhonesTable,
    createLocationsTable,
    createWorkingHoursTable,
    createContactUsFormTable,
    createDestinationsTable,
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
