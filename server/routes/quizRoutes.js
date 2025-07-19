const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Leaderboard = require('../models/Leaderboard');

const questions = {
  JavaScript: [
    { question: "What is 'this' keyword in JavaScript?", options: ["Current object", "Previous object", "Global object", "None"], answer: "Current object" },
    { question: "Which symbol is used for comments?", options: ["//", "\\", "#", "<!-- -->"], answer: "//" },
    { question: "Which function converts JSON to string?", options: ["JSON.parse()", "JSON.stringify()", "toString()", "parseJSON()"], answer: "JSON.stringify()" },
    { question: "Which company developed JavaScript?", options: ["Netscape", "Mozilla", "Microsoft", "Google"], answer: "Netscape" },
    { question: "What is 'NaN'?", options: ["Number and Null", "Not a Number", "Null and Negative", "None"], answer: "Not a Number" },
    { question: "Which method adds a new element at end?", options: ["push()", "pop()", "shift()", "unshift()"], answer: "push()" },
    { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Method", "Display Object Management", "None"], answer: "Document Object Model" },
    { question: "Which is not a JavaScript data type?", options: ["Number", "Boolean", "Float", "Undefined"], answer: "Float" },
    { question: "Which loop runs at least once?", options: ["for", "while", "do-while", "foreach"], answer: "do-while" },
    { question: "How to declare a variable?", options: ["var", "let", "const", "All"], answer: "All" }
  ],
  Python: [
    { question: "Who created Python?", options: ["Guido van Rossum", "Dennis Ritchie", "Bjarne Stroustrup", "James Gosling"], answer: "Guido van Rossum" },
    { question: "Which is correct file extension?", options: [".py", ".python", ".pt", ".pyt"], answer: ".py" },
    { question: "Which keyword is used to define function?", options: ["function", "define", "def", "fun"], answer: "def" },
    { question: "Which symbol is used for comments?", options: ["#", "//", "--", "/* */"], answer: "#" },
    { question: "Which type is immutable?", options: ["List", "Dictionary", "Tuple", "Set"], answer: "Tuple" },
    { question: "What is output of: print(2**3)?", options: ["6", "8", "9", "None"], answer: "8" },
    { question: "Which method adds item to list?", options: ["add()", "append()", "insert()", "push()"], answer: "append()" },
    { question: "What is used to handle exceptions?", options: ["try-except", "if-else", "for-while", "catch-throw"], answer: "try-except" },
    { question: "Which loop is used when condition is false initially?", options: ["while", "do-while", "for", "loop"], answer: "while" },
    { question: "How to get type of variable?", options: ["type()", "typeof()", "getType()", "varType()"], answer: "type()" }
  ]
};

// ✅ GET questions by topic
router.get('/questions/:topic', (req, res) => {
  const topic = req.params.topic;
  if (!questions[topic]) {
    return res.status(404).json({ message: "Topic not found" });
  }
  res.json(questions[topic]);
});

// ✅ POST score submission
router.post('/submit', async (req, res) => {
  try {
    const { email, topic, score } = req.body;

    if (!email || !topic || typeof score !== 'number') {
      return res.status(400).json({ message: "Missing or invalid email, topic, or score" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentScore = user.scores.get(topic);

    if (!currentScore || currentScore === "Not Attempted" || Number(score) > Number(currentScore)) {
      user.scores.set(topic, String(score));
      await user.save();

      await Leaderboard.findOneAndUpdate(
        { email, topic },
        { name: user.name, email, topic, score, date: new Date() },
        { upsert: true, new: true }
      );
    }

    res.json({ message: "Score submitted successfully", scores: user.scores });
  } catch (err) {
    console.error("Submit Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET leaderboard by topic
router.get('/leaderboard/:topic', async (req, res) => {
  try {
    const topic = req.params.topic;
    const topScores = await Leaderboard.find({ topic })
      .sort({ score: -1, date: 1 })
      .limit(5);
    res.json(topScores);
  } catch (err) {
    console.error("Leaderboard error:", err.message);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
});

// ✅ GET all users
router.get('/users/all', async (req, res) => {
  try {
    const users = await User.find({}, { name: 1, email: 1, scores: 1, _id: 0 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;