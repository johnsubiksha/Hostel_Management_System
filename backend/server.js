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
  const sql = "SELECT register_number, email, role, password FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: "Internal server error" });

      if (results.length === 0) {
          return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      const user = results[0];

      // Compare hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
          { id: user.register_number, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
      );

      res.json({ success: true, token, role: user.role });
  });
});


app.post("/complaints", (req, res) => {
    const { student_name, room_number, category, complaint } = req.body;
    
    if (!student_name || !room_number || !category || !complaint) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const query = "INSERT INTO complaints (student_name, room_number, category, complaint) VALUES (?, ?, ?, ?)";

    db.query(query, [student_name, room_number, category, complaint], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Complaint submitted successfully!" });
    });
});


app.get("/complaints", (req, res) => {
    db.query("SELECT * FROM complaints", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


app.post("/outpass", (req, res) => {
    const { student_name, room_number, reason, intime, outtime, indate, oudate } = req.body;
  
    if (!student_name || !room_number || !reason || !intime || !outtime || !indate || !oudate) {
      return res.status(400).json({ error: "All fields are required!" });
    }
  
    const query = "INSERT INTO outpass (student_name, room_number, reason, intime, outtime, indate, oudate) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
    db.query(query, [student_name, room_number, reason, intime, outtime, indate, oudate], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Outpass request submitted successfully!" });
    });
  });
  

  app.get("/outpass", (req, res) => {
    db.query("SELECT * FROM outpass", (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });


app.get("/outpass", (req, res) => {
    db.query("SELECT * FROM outpass", (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
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
        return res.status(500).json({ error: err.message });
      }
      res.json({ message:`Outpass request ${status.toLowerCase()} successfully!`});
    });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
