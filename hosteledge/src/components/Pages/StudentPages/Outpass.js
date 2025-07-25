import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Outpass.css";
import Sidebar from "./StudentSidebar";

const Outpass = () => {
  const [studentRegisterNumber, setStudentRegisterNumber] = useState("");
  const [outpassReason, setOutpassReason] = useState("");
  const [outDate, setOutDate] = useState("");
  const [inDate, setInDate] = useState("");
  const [outTime, setOutTime] = useState("");
  const [inTime, setInTime] = useState("");
  const [message, setMessage] = useState("");
  const [outpasses, setOutpasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHistory,setShowHistory] = useState(false);

  useEffect(() => {
    const fetchOutpasses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/outpass");
        setOutpasses(response.data);
      } catch (error) {
        console.error("Error fetching outpasses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOutpasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentRegisterNumber.trim() || !outpassReason.trim() || !outDate || !inDate || !outTime || !inTime) {
      setMessage("❌ Error: All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/outpass", {
        register_number: studentRegisterNumber,
        reason: outpassReason,
        intime: inTime,
        outtime: outTime,
        indate: inDate,
        outdate: outDate,
      });

      setMessage("✅ Outpass request submitted successfully!");

      // Refresh outpasses after submission
      const response = await axios.get("http://localhost:5000/outpass");
      setOutpasses(response.data);

      // Clear the form fields
      setStudentRegisterNumber("");
      setOutpassReason("");
      setOutDate("");
      setInDate("");
      setOutTime("");
      setInTime("");
    } catch (error) {
      setMessage("❌ Error: " + (error.response?.data?.error || "Server unavailable"));
    }
  };

  const handleHistory = ()=>{
    setShowHistory(!showHistory);
  }

  return (
    <>
    <Sidebar />
    <div className="outpass-container">
      <h2>Request a New Outpass</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={studentRegisterNumber}
          onChange={(e) => setStudentRegisterNumber(e.target.value)}
          placeholder="Register Number"
          required
        />
        <textarea
          value={outpassReason}
          onChange={(e) => setOutpassReason(e.target.value)}
          placeholder="Reason for Outpass"
          required
        />
        <input type="date" value={outDate} onChange={(e) => setOutDate(e.target.value)} required />
        <input type="date" value={inDate} onChange={(e) => setInDate(e.target.value)} required />
        <input type="time" value={outTime} onChange={(e) => setOutTime(e.target.value)} required />
        <input type="time" value={inTime} onChange={(e) => setInTime(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}

      <button onClick={handleHistory}>History</button>
      {loading ? (
        <p>Loading...</p>
      ) : showHistory ? (outpasses.length > 0) ? (
        <div className="outpass-list">
          {outpasses.map((outpass, index) => (
            <div key={index} className="outpass-item">
              <p><strong>Register Number:</strong> {outpass.register_number || "N/A"}</p>
              <p><strong>Room:</strong> {outpass.room_no || "N/A"}</p>
              <p><strong>Reason:</strong> {outpass.reason}</p>
              <p><strong>Out Date:</strong> {outpass.outdate}, <strong>Out Time:</strong> {outpass.outtime}</p>
              <p><strong>In Date:</strong> {outpass.indate}, <strong>In Time:</strong> {outpass.intime}</p>
              <p className={`status ${outpass.status?.toLowerCase()}`}><strong>Status:</strong> {outpass.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No previous outpass requests found.</p>
      ):<p></p>}
    </div>
    </>
  );
};

export default Outpass;
