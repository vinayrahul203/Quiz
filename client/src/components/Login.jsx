import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name || !email) return alert("Enter all fields");

    try {
      const res = await fetch("https://quiz-tmeo.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      localStorage.setItem("quiz-user", JSON.stringify(data));
      navigate("/topics");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🧠 Quiz Login</h2>
        <input
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button style={styles.button} onClick={handleLogin}>
          Login & Start
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #667eea, #764ba2)",
  },
  card: {
    padding: "2rem",
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    width: "300px",
    textAlign: "center",
  },
  title: {
    marginBottom: "1rem",
    color: "#333",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "10px",
    width: "100%",
    background: "#667eea",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "1rem",
  },
};

export default Login;
