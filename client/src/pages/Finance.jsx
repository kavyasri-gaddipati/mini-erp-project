// client/src/pages/Finance.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function Finance() {
  const [projects, setProjects] = useState([]);
  
  // Form Data States
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectBudget, setNewProjectBudget] = useState("");

  // 1. Fetch Projects for the Dropdown list
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://mini-erp-backend-ji04.onrender.com/api/data/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 2. Handle Create Invoice
  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    if (!selectedProject || !invoiceAmount) return alert("Please select project and amount");

    try {
      await axios.post("https://mini-erp-backend-ji04.onrender.com/api/data/invoices", {
        project_id: selectedProject,
        amount: invoiceAmount,
      });
      alert("Invoice Created Successfully!");
      setInvoiceAmount("");
      fetchProjects(); // Refresh data to update 'Spent' amount
    } catch (err) {
      console.error(err);
      alert("Error creating invoice");
    }
  };

  // 3. Handle Create New Project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://mini-erp-backend-ji04.onrender.com/api/data/projects", {
        name: newProjectName,
        budget: newProjectBudget,
        start_date: "2023-01-01", // Dummy dates for now
        end_date: "2023-12-31"
      });
      alert("Project Created!");
      setNewProjectName("");
      setNewProjectBudget("");
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Error creating project");
    }
  };

  return (
    <div style={{ padding: "20px", display: "flex", gap: "50px" }}>
      
      {/* LEFT SIDE: Create Invoice */}
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", width: "40%" }}>
        <h2 style={{ color: "blue" }}>🧾 Create Invoice</h2>
        <form onSubmit={handleCreateInvoice} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label>Select Project:</label>
          <select 
            value={selectedProject} 
            onChange={(e) => setSelectedProject(e.target.value)}
            style={{ padding: "10px" }}
          >
            <option value="">-- Choose Project --</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name} (Budget: ${p.budget})</option>
            ))}
          </select>

          <label>Invoice Amount ($):</label>
          <input 
            type="number" 
            placeholder="Enter Amount" 
            value={invoiceAmount}
            onChange={(e) => setInvoiceAmount(e.target.value)}
            style={{ padding: "10px" }}
          />

          <button type="submit" style={{ padding: "10px", background: "green", color: "white", cursor: "pointer" }}>
            Submit Invoice
          </button>
        </form>
      </div>

      {/* RIGHT SIDE: Create Project */}
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", width: "40%" }}>
        <h2 style={{ color: "purple" }}>🏗 Create New Project</h2>
        <form onSubmit={handleCreateProject} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input 
            type="text" 
            placeholder="Project Name" 
            value={newProjectName} 
            onChange={(e) => setNewProjectName(e.target.value)}
            style={{ padding: "10px" }}
          />
          <input 
            type="number" 
            placeholder="Total Budget" 
            value={newProjectBudget} 
            onChange={(e) => setNewProjectBudget(e.target.value)}
            style={{ padding: "10px" }}
          />
          <button type="submit" style={{ padding: "10px", background: "purple", color: "white", cursor: "pointer" }}>
            Add Project
          </button>
        </form>
      </div>

    </div>
  );
}

export default Finance;