// client/src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart Components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Backend nundi AI Risk Data techukuntunnam
    axios.get("https://mini-erp-backend-ji04.onrender.com/api/data/insights")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Prepare Data for the Graph (Chart)
  const chartData = {
    labels: projects.map((p) => p.projectName), // Project Names
    datasets: [
      {
        label: "Budget ($)",
        data: projects.map((p) => p.budget),
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue
      },
      {
        label: "Spent ($)",
        data: projects.map((p) => p.spent),
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Project Risk Dashboard (AI Insights)</h2>

      {/* 1. RISK ALERTS SECTION */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
        {projects.map((p) => (
          <div key={p.projectName} style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: p.riskLevel === "High" ? "#ffe6e6" : "#e6fffa", // Red for High Risk
            width: "250px"
          }}>
            <h3>{p.projectName}</h3>
            <p>Risk Score: <strong>{p.riskScore}</strong></p>
            <p>Status: <strong style={{ color: p.riskLevel === "High" ? "red" : "green" }}>{p.riskLevel} Risk</strong></p>
          </div>
        ))}
      </div>

      {/* 2. GRAPH SECTION */}
      <div style={{ height: "400px", width: "800px", margin: "0 auto" }}>
        {projects.length > 0 ? <Bar data={chartData} /> : <p>Loading Data...</p>}
      </div>
    </div>
  );
}

export default Dashboard;