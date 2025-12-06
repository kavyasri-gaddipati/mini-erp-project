# Construction Mini ERP & Finance System

This is a Full-Stack ERP prototype designed for the construction industry. It manages Users, Projects, and Invoices, and features an "AI-driven" logic system to calculate project risk based on budget utilization.

## 🚀 Features
* **User Authentication:** Secure Login/Register using JWT & Bcrypt.
* **Dashboard:** Visualizes Project Budget vs Spent using Charts.
* **AI Insights:** Automatically flags projects as "High Risk" if spent > 80% of budget.
* **Finance Module:** Create Projects and Invoices dynamically.

## 🛠 Tech Stack
* **Frontend:** React.js, Vite, Chart.js, Axios.
* **Backend:** Node.js, Express.js.
* **Database:** MySQL (Relational Schema).

## ⚙️ How to Run
1.  **Setup Database:** Import the SQL schema in MySQL Workbench.
2.  **Backend:**
    ```bash
    cd server
    npm install
    npm start
    ```
3.  **Frontend:**
    ```bash
    cd client
    npm install
    npm run dev
    ```
4.  **Login Credentials:**
    * Username: admin_user
    * Password: password123