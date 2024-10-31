const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hotels', 'root', 'Om@rEssam2003', {
  host: 'localhost',
  dialect: 'mysql', // or 'postgres', 'sqlite', etc. based on what you use
});

// Test the connection (optional, but useful for debugging)
sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize; // Ensure this exports the sequelize instance
