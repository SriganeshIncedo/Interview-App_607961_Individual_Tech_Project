import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import InterviewForm from "./interview";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview" element={<InterviewForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
