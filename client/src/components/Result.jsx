import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Result = () => {
  const { topic } = useParams();
  const [score, setScore] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("quiz-user"));

  useEffect(() => {
    const fetchScore = async () => {
      try {
     const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${user.email}`);

        const data = await res.json();
        setScore(data.scores[topic]);
      } catch (err) {
        alert("Error fetching score");
      }
    };
    fetchScore();
  }, [topic, user.email]);

  const handleLeaderboard = () => {
    navigate(`/leaderboard/${topic}`);
  };

  const handleBack = () => {
    navigate("/topics");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🎉 Quiz Completed!</h2>
        <h3 style={styles.score}>
          {user.name}, your score in <span style={styles.topic}>{topic}</span> is:
          <br />
          <span style={styles.points}>{score}</span> / 10
        </h3>
        <div style={styles.btnGroup}>
          <button style={styles.button} onClick={handleLeaderboard}>
            🏆 View Leaderboard
          </button>
          <button style={{ ...styles.button, backgroundColor: "#ccc", color: "#000" }} onClick={handleBack}>
            🔁 Try Another Topic
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #43cea2, #185a9d)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    background: "white",
    padding: "2rem 3rem",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
    textAlign: "center",
    maxWidth: "500px",
    width: "100%",
  },
  heading: {
    color: "#333",
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  score: {
    fontSize: "1.2rem",
    marginBottom: "1.5rem",
  },
  topic: {
    color: "#667eea",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  points: {
    display: "block",
    fontSize: "3rem",
    fontWeight: "bold",
    marginTop: "0.5rem",
    color: "#222",
  },
  btnGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  button: {
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "10px",
    background: "#667eea",
    color: "white",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
  },
};

export default Result;
