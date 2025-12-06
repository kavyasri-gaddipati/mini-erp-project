// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        {/* Simple Navigation Bar */}
        <nav style={{ marginBottom: "20px", padding: "10px", background: "#eee" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Login</Link>
          <Link to="/dashboard" style={{ marginRight: "15px" }}>Dashboard</Link>
          <Link to="/finance">Finance</Link>
        </nav>

        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/finance" element={<Finance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;