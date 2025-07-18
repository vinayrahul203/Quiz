const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  name: String,
  email: String,
  topic: String,
  score: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
