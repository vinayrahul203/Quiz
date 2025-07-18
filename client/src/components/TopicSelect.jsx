import { useNavigate } from "react-router-dom";

const topics = ["JavaScript", "Java", "Cpp", "Python"];

const TopicSelect = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("quiz-user"));

  const handleStart = (topic) => {
    navigate(`/quiz/${topic}`);
  };

  if (!user) return <p>Please login again</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome, {user.name} 👋</h2>
      <p style={styles.subtitle}>Choose a topic to begin:</p>
      <div style={styles.grid}>
        {topics.map((topic) => (
          <div
            key={topic}
            style={styles.card}
            onClick={() => handleStart(topic)}
          >
            <h3>{topic}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)",
    color: "white",
    padding: "2rem",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#ddd",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
    maxWidth: "800px",
    margin: "auto",
  },
  card: {
    background: "white",
    color: "#333",
    padding: "2rem",
    borderRadius: "1rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1.1rem",
    transition: "0.3s",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  },
};

styles.card[':hover'] = {
  transform: "scale(1.05)",
  background: "#f0f0f0",
};

export default TopicSelect;
