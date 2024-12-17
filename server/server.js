const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Paviraji@2409",
    database: "employees",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1); 
    }
    console.log("Mysql connected successfully");
});

app.post("/emp", (req, res) => {
    const { name, employeeId, email, phoneNumber, department, dateOfJoining, role } = req.body;

    if (!name || !employeeId || !email || !phoneNumber || !department || !dateOfJoining || !role) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const query = "INSERT INTO employee (name, employeeId, email, phoneNumber, department, dateOfJoining, role) VALUES(?,?,?,?,?,?,?)";

    db.query(query, [name, employeeId, email, phoneNumber, department, dateOfJoining, role], (err, results) => {
        if (err) {
            console.error("Error occurred while processing:", err);
            return res.status(500).json({ message: "Error occurred while processing the data", error: err });
        }

        res.status(200).json({ message: "Details submitted successfully" });
    });
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

