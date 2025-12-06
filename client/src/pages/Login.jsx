// client/src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Page refresh avvakunda aputhundi
    try {
      // Backend ki Username/Password pampistunnam
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      // Success aithe:
      alert("Login Successful!");
      localStorage.setItem("token", res.data.token); // Token save chestunnam
      navigate("/dashboard"); // Dashboard ki teesukeltundi

    } catch (err) {
      // Fail aithe:
      alert("Invalid Credentials! Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>ERP System Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        />
        
        <button type="submit" style={{ padding: "10px", background: "blue", color: "white", fontSize: "16px", cursor: "pointer" }}>
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;