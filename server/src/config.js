const dotenv = require('dotenv');
dotenv.config();

// Exporting env variable
module.exports = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};
