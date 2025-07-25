import React, { useState } from "react";
import Sidebar from "./WardenSidebar";
import axios from "axios";
const AddRoom = () =>{
    const [roomData,setRoomData] = useState({
        'room_no':"",
        'room_type':"",
        'capacity':"",
        'ac_status':"",
    })

    const [msg,setMsg] = useState("");
    const handleChange = (e)=>{
        setRoomData({...roomData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    const { room_no, room_type, capacity, ac_status } = roomData;

    if (!room_no || !room_type || !capacity || !ac_status) {
        setMsg("❗ All fields are required");
        return;
    }

    try {
        await axios.post('http://localhost:5000/add-room', roomData);
        setMsg("✅ Room added successfully");
        setRoomData({
            room_no: "",
            room_type: "",
            capacity: "",
            ac_status: "",
        });
    } catch (error) {
        setMsg("❌ Error: " + (error.response?.data?.error || "Server unavailable"));
    }
};



    return(
        <>
        <Sidebar />
      <div className="request-form-container">
        <h2 className="form-title">Add Room</h2>
            <form onSubmit={handleSubmit} className="request-form">
                <input
                    type="text"
                    name="room_no"
                    placeholder="Enter room number"
                    value={roomData.room_no}
                    onChange={handleChange}
                    className="forn_input"
                />
                <input
                    type="text"
                    name="capacity"
                    placeholder="Enter room capacity"
                    value={roomData.capacity}
                    onChange={handleChange}
                    className="forn_input"
                />
                 <div className="form-row">
                    <label className="form-label">
                    Room Type:
                    <select
                        name="room_type"
                        value={roomData.room_type}
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option>Select</option>
                        <option value="Single">Single</option>
                        <option value="Double">Double Sharing</option>
                        <option value="Triple">Triple Sharing</option>
                    </select>
                    </label>

                    <label className="form-label">
                    AC Preference:
                    <select
                        name="ac_status"
                        value={roomData.ac_status}
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option>Select</option>
                        <option value="AC">AC</option>
                        <option value="Non-AC">Non-AC</option>
                    </select>
                    </label>
                </div>
                <button type="submit" className="submit-btn">
                    Submit
                </button>
            </form>
        </div>{msg && <p className="message">{msg}</p>}
        </>
        
    )
}

export default AddRoom;