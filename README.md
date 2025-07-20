
# 🧠 MERN Stack Quiz App

A full-stack quiz application where users can log in, select a programming topic, attempt timed quizzes, and view topic-wise leaderboards. Built using the **MERN Stack**: MongoDB, Express.js, React.js (with Vite), and Node.js.

---

## 🚀 Features

- Simple login using name and email (no password needed)
- Select from 4 quiz topics: JavaScript, Java, C++, Python
- Each quiz has 10 questions with a 2-minute timer
- Score updates only if the new score is higher
- Topic-wise leaderboard showing top 5 performers
- Responsive design with complete CSS styling

---

## 🛠️ Technologies Used

- **Frontend**: React.js (Vite), React Router DOM, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Deployment**: Render (both frontend & backend)

---

## 📁 Project Structure

```
/client         → React frontend (Vite)
/server         → Express backend with MongoDB
  └── routes/   → API routes (users, quiz)
  └── models/   → Mongoose schemas (User, Leaderboard)
```

---

## 🔗 Live Demo

- **Frontend**:https://quiz-1-bzo0.onrender.com
- **Backend API**: https://quiz-tmeo.onrender.com



---

## 🧠 How It Works

1. User enters name and email to log in (first time or returning).
2. Selects one topic (JavaScript, Java, C++, Python).
3. Quiz with 10 questions loads with a 2-minute timer.
4. After submission, score is updated only if it is higher than previous.
5. Leaderboard displays top 5 scores for the selected topic.

---

## 📦 Setup Instructions (Local Development)

### 🔧 Backend Setup

```bash
cd server
npm install
npm run dev
```

### 🔧 Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🧑‍💻 Author

Built  by   
[GitHub](https://github.com/vinayrahul203) 
---
