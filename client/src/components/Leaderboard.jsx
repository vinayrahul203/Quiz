import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Leaderboard = () => {
  const { topic } = useParams();
  const [leaders, setLeaders] = useState([]);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchLeaderboard = async () => {
    try {
     const res = await fetch(`${import.meta.env.VITE_API_URL}/users/all`);

      const data = await res.json();
      const filtered = data
        .filter((u) => u.scores[topic] !== "Not Attempted")
        .map((u) => ({
          name: u.name,
          score: u.scores[topic],
        }))
        .sort((a, b) => b.score - a.score);
      setLeaders(filtered);
    } catch (err) {
      alert("Error fetching leaderboard");
    }
  };
  fetchLeaderboard();
}, [topic]);
return(
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🏆 {topic} Leaderboard</h2>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.headerCell}>Rank</th>
              <th style={styles.headerCell}>Name</th>
              <th style={styles.headerCell}>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaders.length === 0 ? (
              <tr>
                <td colSpan="3" style={styles.empty}>No users attempted this quiz yet.</td>
              </tr>
            ) : (
              leaders.map((user, index) => (
                <tr key={index} style={styles.row}>
                  <td style={styles.cell}>{index + 1}</td>
                  <td style={styles.cell}>{user.name}</td>
                  <td style={styles.cell}>{user.score}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <button style={styles.backBtn} onClick={() => navigate("/topics")}>
          ⬅️ Back to Topics
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #ff9966, #ff5e62)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    background: "white",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1.5rem",
  },
  headerRow: {
    background: "#667eea",
    color: "white",
  },
  headerCell: {
    padding: "12px",
    fontSize: "1rem",
  },
  row: {
    borderBottom: "1px solid #ddd",
  },
  cell: {
    padding: "10px",
    fontSize: "1rem",
  },
  empty: {
    padding: "1rem",
    fontStyle: "italic",
    color: "#666",
  },
  backBtn: {
    padding: "12px 20px",
    backgroundColor: "#667eea",
    color: "white",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Leaderboard;
