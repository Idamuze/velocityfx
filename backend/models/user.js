// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  country: String,
  accountType: String,
  initialDeposit: String,
  experience: String,
  password: String, // Note: hash in production
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
