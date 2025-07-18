import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const { topic } = useParams();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(120); // 2 minutes
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("quiz-user"));

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/quiz/questions/${topic}`)
      .then((res) => setQuestions(res.data))
      .catch(() => alert("Failed to load questions"));
  }, [topic]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          handleSubmit();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [questions]);

  const handleOptionClick = (opt) => setSelected(opt);

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore((prev) => prev + 1);
    }
    setSelected("");
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

const handleSubmit = async () => {
  await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/quiz/submit`, {
    email: user.email,
    topic,
    score,
  });
  navigate(`/result/${topic}`);
};

  if (!user) return <p>Please login again</p>;
  if (questions.length === 0) return <p>Loading quiz...</p>;

  const mins = String(Math.floor(timer / 60)).padStart(2, "0");
  const secs = String(timer % 60).padStart(2, "0");

  return (
    <div style={styles.container}>
      <div style={styles.timer}>⏳ Time Left: {mins}:{secs}</div>
      <div style={styles.card}>
        <h3 style={styles.qtitle}>
          Q{current + 1}: {questions[current].question}
        </h3>
        <div style={styles.options}>
          {questions[current].options.map((opt) => (
            <button
              key={opt}
              style={{
                ...styles.option,
                backgroundColor:
                  selected === opt ? "#667eea" : "white",
                color: selected === opt ? "white" : "black",
              }}
              onClick={() => handleOptionClick(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
        <button onClick={handleNext} style={styles.nextBtn}>
          {current + 1 === questions.length ? "Submit Quiz" : "Next"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    padding: "2rem",
    background: "linear-gradient(to bottom right, #f12711, #f5af19)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  timer: {
    fontSize: "1.2rem",
    background: "#fff",
    padding: "10px 20px",
    borderRadius: "30px",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  card: {
    background: "white",
    padding: "2rem",
    borderRadius: "20px",
    width: "90%",
    maxWidth: "600px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  qtitle: {
    fontSize: "1.4rem",
    marginBottom: "1rem",
    color: "#333",
  },
  options: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "1fr",
    marginBottom: "1.5rem",
  },
  option: {
    padding: "12px",
    borderRadius: "10px",
    border: "2px solid #667eea",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "0.3s ease",
  },
  nextBtn: {
    padding: "12px 20px",
    border: "none",
    background: "#667eea",
    color: "white",
    borderRadius: "10px",
    fontSize: "1rem",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
  },
};

export default Quiz;
