const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  scores: {
    JavaScript: { type: String, default: "Not Attempted" },
    Java: { type: String, default: "Not Attempted" },
    Cpp: { type: String, default: "Not Attempted" },
    Python: { type: String, default: "Not Attempted" }
  }
});

module.exports = mongoose.model('User', userSchema);
