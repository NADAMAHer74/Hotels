const mysql = require("mysql");
const connection = require("../config/database");

console.log("Connected to the database");
// Function to create tables
const createTables = async () => {
  const createUsersTable = `
     CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('Admin', 'User') DEFAULT 'User',
        created_at TIMESTAMP 
    );
  `;

  const createToursTable = `
    CREATE TABLE IF NOT EXISTS tours (
        tour_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        adultPrice DECIMAL(10, 2) NOT NULL,
        kidsPrice DECIMAL(10, 2) NOT NULL,
        childrenPrice DECIMAL(10, 2) NOT NULL,
        durationInDays INT NOT NULL,
        type VARCHAR(255) NOT NULL,
        reviewStars INT CHECK (reviewStars >= 1 AND reviewStars <= 5),
        overview TEXT NOT NULL,
        tourImage VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        miniAge INT NOT NULL,
        maxGusts INT NOT NULL,
        languagesSupport VARCHAR(255) NOT NULL,
        created_at TIMESTAMP
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
        created_at TIMESTAMP ,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (tour_id) REFERENCES tours(tour_id) ON DELETE CASCADE
    );
  `;


  const createToursAdditionalServicesTable = `
  CREATE TABLE IF NOT EXISTS tours_additional_services (
      UserToursAdditionalServices_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      tour_additional_services INT UNSIGNED NOT NULL,
      additional_service_id INT UNSIGNED NOT NULL,
      FOREIGN KEY (tour_additional_services) REFERENCES tours(tour_id) ON DELETE CASCADE,
      FOREIGN KEY (additional_service_id) REFERENCES available_additional_services(available_additional_service_id) ON DELETE CASCADE
  );
`;

  const createAvailableAdditionalServicesTable = `
    CREATE TABLE IF NOT EXISTS available_additional_services (
        available_additional_service_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        service_name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP 
    );
  `;



const createUserToursAdditionalServicesTable = `
CREATE TABLE IF NOT EXISTS user_tours_additional_services (
    UserToursAdditionalServices_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_tour_id INT UNSIGNED NOT NULL,
    additional_service_id INT UNSIGNED NOT NULL,
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
      imageUrl VARCHAR(255), -- Add the imageUrl field here
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
      PRIMARY KEY (tours_tour_id, amenities_amenities_id),
      FOREIGN KEY (tours_tour_id) REFERENCES tours(tour_id) ON DELETE CASCADE,
      FOREIGN KEY (amenities_amenities_id) REFERENCES amenities(amenities_id) ON DELETE CASCADE
    );
  `;

  const createPagesTable = `
  CREATE TABLE IF NOT EXISTS pages (
      page_id VARCHAR(20) NOT NULL PRIMARY KEY
  );
`;

const createBannersTable = `
  CREATE TABLE IF NOT EXISTS banners (
      banner_id INT AUTO_INCREMENT PRIMARY KEY,
      head VARCHAR(200) NOT NULL,
      visible TINYINT NOT NULL,
      pages_page_id VARCHAR(20) NOT NULL,
      FOREIGN KEY (pages_page_id) REFERENCES pages(page_id) ON DELETE CASCADE
  );
`;

const createImageBannersTable = `
  CREATE TABLE IF NOT EXISTS imageBanners (
      banner_image_id INT AUTO_INCREMENT PRIMARY KEY,
      image MEDIUMTEXT NOT NULL,
      visible TINYINT NOT NULL,
      banner_page_id INT NOT NULL,
      FOREIGN KEY (banner_page_id) REFERENCES banners(banner_id) ON DELETE CASCADE
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
      location VARCHAR(250) NOT NULL,
      category VARCHAR(100) NOT NULL,
      image MEDIUMTEXT NOT NULL,
      visible TINYINT NOT NULL
    );
  `;

  const createAboutUsTable = `
  CREATE TABLE IF NOT EXISTS AboutUs (
      AboutUs_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      head VARCHAR(300) NOT NULL,
      Body TEXT NOT NULL
  );
`;

const createAboutUsImagesTable = `
  CREATE TABLE IF NOT EXISTS AboutUsImages (
      AboutUsImages_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      Image MEDIUMTEXT NOT NULL,
      visible TINYINT NOT NULL
  );
`;

const createStatisticsTable = `
  CREATE TABLE IF NOT EXISTS Statistics (
      Statistics_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      Name VARCHAR(100) NOT NULL,
      Quantity INT NOT NULL,
      visible TINYINT NOT NULL
  );
`;

const createWhatToDoTable = `
  CREATE TABLE IF NOT EXISTS WhatToDo (
      WhatToDo_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      Head VARCHAR(300) NOT NULL,
      Body TEXT NOT NULL
  );
`;

const createWhatToDoImagesTable = `
  CREATE TABLE IF NOT EXISTS WhatToDoImages (
      WhatToDoImage_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      Image MEDIUMTEXT NOT NULL,
      visible TINYINT NOT NULL
  );
`;

const createServicesTable = `
  CREATE TABLE IF NOT EXISTS Services (
      Services_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      Head VARCHAR(100) NOT NULL,
      Body TEXT NOT NULL,
      Icon MEDIUMTEXT NOT NULL,
      visible TINYINT NOT NULL
  );
`;

const createEmailsTable = `
  CREATE TABLE IF NOT EXISTS emails (
      email_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(250) NOT NULL,
      visible TINYINT NOT NULL
  );
`;







  // Array of queries to execute
  const queries = [
    createUsersTable,
    createToursTable,
    createUserToursTable,
    createAvailableAdditionalServicesTable,
    createToursAdditionalServicesTable,
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
    createImageBannersTable,
    createEmailsTable,
    createAboutUsTable,
    createAboutUsImagesTable,
    createStatisticsTable,
    createWhatToDoTable,
    createServicesTable,
    createWhatToDoImagesTable,
  ];

  queries.forEach((query, index) => {
    console.log(`Creating table ${index + 1}`);
    connection.query(query, (error) => {
      if (error) {
        console.error(`Error creating table ${index + 1}:`, error);
      } else {
        console.log(`Table ${index + 1} created or already exists`);
      }
    });
  });

  connection.end();
};

module.exports = { createTables };
