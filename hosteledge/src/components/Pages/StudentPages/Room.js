import React, { useEffect, useState } from 'react';
import Sidebar from './StudentSidebar';
import axios from 'axios';
import './Room.css'; // Still useful for spacing and font

const Room = () => {
  const [roomDetail, setRoomDetail] = useState([]);

  useEffect(() => {
    fetchRoomDetail();
  }, []);

  const fetchRoomDetail = async () => {
    try {
      const res = await axios.get("http://localhost:5000/myroom");
      setRoomDetail(res.data);
    } catch (error) {
      console.error("Error fetching room detail:", error);
    }
  };

  const roomInfo = roomDetail.length > 0 ? roomDetail[0] : null;

  return (
    <>
      <Sidebar />
      <div className="formal-layout">
        <h2>Room Details</h2>
        {roomInfo ? (
          <>
            <p><strong>Room ID:</strong> {roomInfo.room_id}</p>
            <p><strong>Room Number:</strong> {roomInfo.room_number}</p>
            <p><strong>Room Type:</strong> {roomInfo.room_type}</p>
            <p><strong>Capacity:</strong> {roomInfo.capacity}</p>
            <p><strong>AC Status:</strong> {roomInfo.ac_status}</p>
          </>
        ) : (
          <p>Loading room details...</p>
        )}

        {roomInfo?.capacity > 1 && (
          <>
            <h2>Roommates</h2>
            {roomDetail.map((student, index) => (
              <div className="roommate-line" key={index}>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Register Number:</strong> {student.register_number}</p>
                <p><strong>Department:</strong> {student.department}</p>
                <p><strong>Year:</strong> {student.year}</p>
                <hr />
              </div>
            ))}
          </>
        )}

        {roomInfo?.capacity === 1 && (
          <p><em>This is a single sharing room. No roommates assigned.</em></p>
        )}
      </div>
    </>
  );
};

export default Room;
