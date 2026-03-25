// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set in environment');

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected..');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// graceful shutdown
const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error closing MongoDB connection', err);
  }
};

process.on('SIGINT', async () => {
  await closeDB();
  process.exit(0);
});

module.exports = { connectDB, closeDB };