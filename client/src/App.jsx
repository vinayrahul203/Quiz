import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import TopicSelect from "./components/TopicSelect";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Leaderboard from './components/Leaderboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/topics" element={<TopicSelect />} />
        <Route path="/quiz/:topic" element={<Quiz />} />
        <Route path="/result/:topic" element={<Result />} />

        <Route path="/leaderboard/:topic" element={<Leaderboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
