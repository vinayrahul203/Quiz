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
  Java: [
    { question: "Who invented Java?", options: ["James Gosling", "Dennis Ritchie", "Guido Van Rossum", "Ken Thompson"], answer: "James Gosling" },
    { question: "Java is a __ language.", options: ["Compiled", "Interpreted", "Both", "None"], answer: "Both" },
    { question: "Which method starts execution?", options: ["start()", "main()", "init()", "run()"], answer: "main()" },
    { question: "Which is not keyword?", options: ["static", "Boolean", "void", "private"], answer: "Boolean" },
    { question: "What is JVM?", options: ["Java Virtual Machine", "Java Variable Method", "Java Vendor Module", "None"], answer: "Java Virtual Machine" },
    { question: "Which operator is used to compare?", options: ["=", "==", "equals", "!="], answer: "==" },
    { question: "Default value of int?", options: ["0", "null", "undefined", "-1"], answer: "0" },
    { question: "Which is not OOP principle?", options: ["Inheritance", "Encapsulation", "Compilation", "Polymorphism"], answer: "Compilation" },
    { question: "Which collection allows duplicates?", options: ["Set", "Map", "List", "Queue"], answer: "List" },
    { question: "Which is used for inheritance?", options: ["extends", "implements", "inherits", "derives"], answer: "extends" }
  ],
  Cpp: [
    { question: "Who developed C++?", options: ["Bjarne Stroustrup", "Dennis Ritchie", "James Gosling", "Guido van Rossum"], answer: "Bjarne Stroustrup" },
    { question: "C++ is a __ language.", options: ["Procedural", "Object Oriented", "Functional", "Markup"], answer: "Object Oriented" },
    { question: "Which symbol is used for pointer?", options: ["*", "&", "@", "#"], answer: "*" },
    { question: "Which keyword is used to create a class?", options: ["class", "struct", "define", "object"], answer: "class" },
    { question: "Which is used to define constant variable?", options: ["const", "let", "static", "final"], answer: "const" },
    { question: "Which is not a loop in C++?", options: ["for", "foreach", "while", "do-while"], answer: "foreach" },
    { question: "What is output of cout << 5 + 3?", options: ["8", "53", "35", "Error"], answer: "8" },
    { question: "What is a constructor?", options: ["Special function", "Loop", "Variable", "None"], answer: "Special function" },
    { question: "Which is used to allocate memory?", options: ["malloc", "new", "create", "make"], answer: "new" },
    { question: "Which header is for I/O?", options: ["iostream", "stdio.h", "stdlib.h", "input.h"], answer: "iostream" }
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

// Get quiz questions by topic
router.get('/questions/:topic', (req, res) => {
  const topic = req.params.topic;
  if (!questions[topic]) {
    return res.status(404).json({ message: "Topic not found" });
  }
  res.json(questions[topic]);
});

// Submit score for a topic

router.post('/submit', async (req, res) => {
  try {
    const { email, topic, score } = req.body;

    if (!email || !topic || score === undefined) {
      return res.status(400).json({ message: "Missing email, topic, or score" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentScore = user.scores[topic];

    // Update score only if higher
    if (
      currentScore === "Not Attempted" ||
      Number(score) > Number(currentScore)
    ) {
      user.scores[topic] = score;
      await user.save();

      // ✅ Update leaderboard as well
      await Leaderboard.findOneAndUpdate(
        { email, topic },
        { name: user.name, score, topic, email, date: new Date() },
        { upsert: true, new: true }
      );
    }

    res.json({ message: "Score updated", scores: user.scores });
  } catch (err) {
    console.error("❌ Backend Error in /submit route:", err.message, err.stack);
    res.status(500).json({ message: "Server error" });
  }
});


// Get top 5 leaderboard for a topic
router.get('/leaderboard/:topic', async (req, res) => {
  try {
    const topic = req.params.topic;
    const topScores = await Leaderboard.find({ topic })
      .sort({ score: -1, date: 1 })
      .limit(5);
    res.json(topScores);
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
});


// Route to get all users and their scores
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