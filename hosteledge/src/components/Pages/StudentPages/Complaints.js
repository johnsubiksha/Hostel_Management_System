import React, { useState, useEffect } from "react";
import "./Complaints.css";
import axios from "axios";

const Complaints = () => {
  const [regNum, setRegNum] = useState("");
  const [category, setCategory] = useState("");
  const [complaint, setComplaint] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/complaints-stu");
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching complaint history", error);
      }
    };

    fetchHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!regNum || !category || !complaint || !name || !year) {
      setMessage("❌ Error: All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/complaints", {
        regNum,
        category,
        complaint,
      });

      // Clear form
      setName("");
      setYear("");
      setRegNum("");
      setCategory("");
      setComplaint("");
      setMessage("✅ Complaint submitted successfully!");

      // Refresh history
      const res = await axios.get("http://localhost:5000/complaints-stu");
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to submit complaint", err);
      setMessage("❌ Failed to submit complaint.");
    }
  };

  return (
    <div className="complaints-split">
      {/* Left - Form */}
      <div className="complaints-container form-section">
        <h2>Submit a Complaint</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="year">Year</label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          >
            <option value="">-- Select Year --</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>

          <label htmlFor="regNum">Register Number</label>
          <input
            id="regNum"
            type="text"
            value={regNum}
            onChange={(e) => setRegNum(e.target.value)}
            placeholder="Enter register number"
            required
          />

          <label htmlFor="category">Complaint Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">-- Select Complaint Type --</option>
            <option value="Electrical Issue">Electrical Issue</option>
            <option value="Water Problem">Water Problem</option>
            <option value="Furniture Damage">Furniture Damage</option>
            <option value="Not Cleaning">Not Cleaning</option>
            <option value="Food Quality">Food Quality</option>
            <option value="Internet Issue">Internet Issue</option>
            <option value="Security Concern">Security Concern</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="complaint">Complaint Details</label>
          <textarea
            id="complaint"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Enter your complaint here"
            required
          />

          <button type="submit">Submit</button>
        </form>

        {message && (
          <p className={`message ${message.includes("Error") ? "error" : "success"}`}>
            {message}
          </p>
        )}
      </div>

      {/* Right - History */}
      <div className="complaints-container history-section">
        <h2>Previous Complaints</h2>
        {history.length === 0 ? (
          <p>No complaints yet.</p>
        ) : (
          <ul className="history-list">
            {history.map((item, index) => (
              <li key={index}>
                <strong>{item.category}</strong>: {item.complaint}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Complaints;
