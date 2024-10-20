const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hotels', 'root', 'Om@rEssam2003', {
  host: 'localhost',
  dialect: 'mysql', // Adjust if you're using a different database
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize; // Ensure this exports the sequelize instance
