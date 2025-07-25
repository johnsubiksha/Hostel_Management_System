import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OutpassRequest.css";
import WardenSidebar from './WardenSidebar'

const OutpassRequest = () => {
  const [outpassRequests, setOutpassRequests] = useState([]);

  useEffect(() => {
    fetchOutpassRequests();
  }, []);

  const fetchOutpassRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/outpass");
      setOutpassRequests(response.data);
    } catch (error) {
      console.error("Error fetching outpass requests:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/outpass/${id}`, { status });
      fetchOutpassRequests(); // Refresh list after update
    } catch (error) {
      console.error("Error updating outpass status:", error);
    }
  };

  return (
    <>
    <WardenSidebar />
    <div className="outpass">
      <h2>Outpass Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Room Number</th>
            <th>Reason</th>
            <th>Out Date</th>
            <th>In Date</th>
            <th>Out Time</th>
            <th>In Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
  {Array.isArray(outpassRequests) && outpassRequests.length > 0 ? (
    outpassRequests.map((request) => (
      <tr key={request.id}>
        <td>{request.name}</td>
        <td>{request.room_no}</td>
        <td>{request.reason}</td>
        <td>{request.outdate}</td>
        <td>{new Date(request.indate).toLocaleDateString()}</td>
        <td>{new Date(request.outdate).toLocaleDateString()}</td>
        <td>{request.intime}</td>
        <td className={`status ${request.status.toLowerCase()}`}>
          {request.status}
        </td>
        <td>
          {request.status === "Pending" && (
            <>
              <button className="approve" onClick={() => updateStatus(request.id, "Approved")}>
                Approve
              </button>
              <button className="reject" onClick={() => updateStatus(request.id, "Rejected")}>
                Reject
              </button>
            </>
          )}
        </td>
      </tr>
      ))
     ) : (
    <tr>
      <td colSpan="9">No Outpass Requests Found</td>
    </tr>
  )}
</tbody>
</table>
</div>
</>
  );
};

export default OutpassRequest;