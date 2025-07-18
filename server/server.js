const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection failed:", err));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/quiz', require('./routes/quizRoutes'));

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));