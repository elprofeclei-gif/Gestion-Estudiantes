const mongoose = require('mongoose');
const config = require('./env');

async function connectDatabase() {
  try {
    await mongoose.connect(config.mongoUri);

    console.log('MongoDB conectado correctamente');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDatabase;
