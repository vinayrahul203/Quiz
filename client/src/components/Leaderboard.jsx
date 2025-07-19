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
        Back to Topics
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
    background: "linear-gradient(to right, #1d976c, #93f9b9)",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2rem",
    color: "#fff",
    marginBottom: "1rem",
  },
  noData: {
    color: "#fff",
    fontSize: "1.2rem",
  },
  list: {
    listStyle: "none",
    padding: 0,
    maxWidth: "400px",
    margin: "auto",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",

  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    borderBottom: "1px solid #eee",
    fontWeight: "bold",
    color: "#333",
  },
  score: {
    color: "#1d976c",
  },
  button: {
    marginTop: "2rem",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    background: "#fff",
    color: "#1d976c",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Leaderboard;
