import React, { useState } from "react";
import "./RoomRequestForm.css";
import Sidebar from "./StudentSidebar";
import axios from "axios";

const RoomRequestForm = () => {
  const [formData, setFormData] = useState({
    regNo: "",
    name: "", // ← added
    department: "",
    year: "",
    roomType: "Single",
    ac_status: "Non-AC",
    r1: "",
    r2: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { regNo, name, department, year, roomType, ac_status, r1, r2 } = formData;

    if (!regNo || !name || !department || !year || !roomType || !ac_status) {
      setMessage("❌ Error: All fields are required!");
      return;
    }

    if (roomType === "Double" && !r1) {
      setMessage("❌ Please enter your roommate's register number.");
      return;
    }

    if (roomType === "Triple" && (!r1 || !r2)) {
      setMessage("❌ Please enter both roommates' register numbers.");
      return;
    }

    const payload = {
      register_number: regNo,
      name, // ← added
      department,
      year,
      room_type: roomType,
      ac_status,
    };

    if (roomType === "Double") {
      payload.roommate1 = r1;
    }
    if (roomType === "Triple") {
      payload.roommate1 = r1;
      payload.roommate2 = r2;
    }

    try {
      await axios.post("http://localhost:5000/allocate-room", payload);

      setMessage("✅ Room allocation request submitted successfully!");

      setFormData({
        regNo: "",
        name: "", // ← added
        department: "",
        year: "",
        roomType: "Single",
        ac_status: "Non-AC",
        r1: "",
        r2: "",
      });
    } catch (error) {
      setMessage("❌ Error: " + (error.response?.data?.error || "Server unavailable"));
    }
  };

  return (
    <>
      <Sidebar />
      <div className="request-form-container">
        <h2 className="form-title">Room Allocation Request Form</h2>
        <form onSubmit={handleSubmit} className="request-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="text"
            name="regNo"
            placeholder="Register Number"
            value={formData.regNo}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="text"
            name="department"
            placeholder="Course / Department"
            value={formData.department}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="form-input"
          />

          <div className="form-row">
            <label className="form-label">
              Room Type:
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Single">Single</option>
                <option value="Double">Double Sharing</option>
                <option value="Triple">Triple Sharing</option>
              </select>
            </label>

            <label className="form-label">
              AC Preference:
              <select
                name="ac_status"
                value={formData.ac_status}
                onChange={handleChange}
                className="form-input"
              >
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
              </select>
            </label>
          </div>

          {formData.roomType === "Double" && (
            <input
              type="text"
              name="r1"
              placeholder="Roommate 1 Reg No"
              value={formData.r1}
              onChange={handleChange}
              className="form-input"
            />
          )}

          {formData.roomType === "Triple" && (
            <>
              <input
                type="text"
                name="r1"
                placeholder="Roommate 1 Reg No"
                value={formData.r1}
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="text"
                name="r2"
                placeholder="Roommate 2 Reg No"
                value={formData.r2}
                onChange={handleChange}
                className="form-input"
              />
            </>
          )}

          <button type="submit" className="submit-btn">
            Submit Request
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
};

export default RoomRequestForm;
