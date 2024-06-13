// models/Pattern.js
const mongoose = require('mongoose');

const patternSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pattern', patternSchema);
