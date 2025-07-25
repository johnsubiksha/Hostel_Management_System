import React, { useEffect, useState } from "react";
import axios from "axios";
import WardenSidebar from "./WardenSidebar";
import "./ViewComplaints.css"; // Create styles here

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:5000/complaints");
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  return (
    <><WardenSidebar />
    <div className="complaints-view">
      <div className="complaints-content">
        <h2>Student Complaints</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Register Number</th>
              <th>Email</th>
              <th>Category</th>
              <th>Complaint</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? (
              complaints.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.register_number}</td>
                  <td>{item.email}</td>
                  <td>{item.category}</td>
                  <td>{item.complaint}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No complaints found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ViewComplaints;
