// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./pages/Home";
import History from "./pages/History";
import HistoryDetails from "./pages/HistoryDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:id" element={<HistoryDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
