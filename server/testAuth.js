// server/testAuth.js
console.log("Script Starting...");
const axios = require('axios'); // We need to install this first

async function testLogin() {
    const url = "http://localhost:5000/api/auth";

    try {
        console.log("1️⃣ Registering User...");
        const reg = await axios.post(`${url}/register`, {
            username: "admin_user",
            password: "password123"
        });
        console.log("✅ Registration Success:", reg.data.message);

        console.log("\n2️⃣ Logging In...");
        const login = await axios.post(`${url}/login`, {
            username: "admin_user",
            password: "password123"
        });
        console.log("✅ Login Success!");
        console.log("🔑 Token Received:", login.data.token.substring(0, 20) + "...");

    } catch (error) {
        console.error("❌ Error:", error.response ? error.response.data : error.message);
    }
}

testLogin();