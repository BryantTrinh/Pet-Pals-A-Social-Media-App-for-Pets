const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/PetPalsDB';

console.log("Connecting to MongoDB with URI:", MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB!');
});

module.exports = db;
