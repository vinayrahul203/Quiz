import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const { topic } = useParams();
  const [leaders, setLeaders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/quiz/leaderboard/${topic}`
        );
        const data = await res.json();
        setLeaders(data);
      } catch (err) {
        alert("Error loading leaderboard");
      }
    };

    fetchLeaders();
  }, [topic]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🏆 {topic} Leaderboard</h2>
      {leaders.length === 0 ? (
        <p style={styles.noData}>No scores yet for this topic.</p>
      ) : (
        <ol style={styles.list}>
          {leaders.map((user, index) => (
            <li key={index} style={styles.item}>
              <span>{user.name}</span>
              <span style={styles.score}>{user.score}</span>
            </li>
          ))}
        </ol>
      )}
      <button style={styles.button} onClick={() => navigate("/topics")}>
        ⬅️ Back to Topics
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
    background: "linear-gradient(to right, #1d2671, #c33764)", // deep purple to pink
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2rem",
    color: "#f5f5f5", // light gray for visibility
    marginBottom: "1.5rem",
  },
  noData: {
    color: "#f5f5f5",
    fontSize: "1.2rem",
    fontStyle: "italic",
  },
  list: {
    listStyle: "none",
    padding: 0,
    maxWidth: "400px",
    margin: "auto",
    background: "#2d2d2d", // dark container background
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    borderBottom: "1px solid #444",
    fontWeight: "bold",
    color: "#f0f0f0", // light text
  },
  score: {
    color: "#00e676", // neon green score
  },
  button: {
    marginTop: "2rem",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    background: "#00e676",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
};

export default Leaderboard;
