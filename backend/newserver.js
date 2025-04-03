const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

app.get("/", (req, res) => {
    res.send("🏠 Hostel Management System Backend Running Successfully!");
});


app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("Login request received for:", email); // Log email

    const sql = "SELECT register_number, email, role, password FROM users WHERE email = ?"; // Query without password check

    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error("Database Query Error:", err); // Log error
            return res.status(500).json({ error: "Database query failed" });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const user = results[0];

        // If passwords are hashed, use bcrypt for comparison
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.register_number, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("Login successful:", { email, role: user.role }); // Log success

        res.json({ success: true, token, role: user.role });
    });
})


app.post("/complaints", (req, res) => {
    const { register_number, category, complaint } = req.body;
    
    if (!register_number || !category || !complaint) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const query = "INSERT INTO complaints (register_number, category, complaint) VALUES (?, ?, ?)";

    db.query(query, [register_number, category, complaint], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Complaint submitted successfully!" });
    });
});


app.get("/complaints", (req, res) => {
    const query = `
        SELECT 
            s.register_number, 
            u.name, 
            u.email, 
            s.room_no,
            c.category, 
            c.complaint 
        FROM complaints c 
        JOIN students s 
        ON c.register_number = s.register_number JOIN users u on u.register_number=s.register_number
        WHERE c.status IN ('Pending', 'In progress')
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.json({ message: "No pending or in-progress complaints found.", data: [] });
        }

        res.json(results);
    });
});



app.post("/outpass", (req, res) => {
    const { register_number, reason, intime, outtime, indate, outdate } = req.body;
  
    if (!register_number || !reason || !intime || !outtime || !indate || !outdate) {
      return res.status(400).json({ error: "All fields are required!" });
    }
  
    const query = "INSERT INTO outpass (register_number, reason, intime, outtime, indate, outdate) VALUES (?, ?, ?, ?, ?, ?)";
  
    db.query(query, [register_number, reason, intime, outtime, indate, outdate], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Outpass request submitted successfully!" });
    });
  });
  

app.get("/outpass", (req, res) => {
    const query = `
        SELECT  
            u.name, 
            u.email,
            s.room_no,
            o.*
        FROM outpass o 
        JOIN students s 
        ON o.register_number = s.register_number 
        JOIN users u on u.register_number = s.register_number
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.json({ message: "No outpass requests found.", data: [] });
        }

        res.json(results);
    });
});




app.put("/outpass/:id", (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    if (!["Approved", "Rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status!" });
    }

    const query = "UPDATE outpass SET status = ? WHERE id = ?";
    
    db.query(query, [status, id], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Outpass request not found!" });
        }

        res.json({ message: `Outpass request ${status.toLowerCase()} successfully!` });
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
