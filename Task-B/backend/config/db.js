const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

module.exports = function connectDB() {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
};
