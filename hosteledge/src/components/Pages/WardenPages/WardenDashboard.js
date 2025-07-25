import React from 'react'
import Sidebar from './WardenSidebar'
import { useEffect, useState } from "react";
import axios from 'axios';
import './WardenDashboard.css'
import { Link } from 'react-router-dom';
const WardenDashboard = () => {
  const [totalStudent,setTotalStudent] = useState(0);
  const [totalRooms,setTotalRooms] = useState(0);
  useEffect(()=>{
    fetchTotalStudents();
    fetchTotalRooms();
  },[])

  const fetchTotalStudents = async()=>{
    try{
      const res = await axios.get("http://localhost:5000/totalstudents");
      setTotalStudent(res.data);
    }
    catch(error){
      console.error("error fetching total students:",error);
    }
  }

  const fetchTotalRooms = async ()=>{
    try{
      const res = await axios.get("http://localhost:5000/totalrooms");
      setTotalRooms(res.data);
    }
    catch(error){
      console.error("Error while fetching total rooms,error")
    }
  }
  return (
    <>
    <Sidebar />
    <div className="dashboard-container">
      <div className="content">
        <h1>Welcome to Warden Dashboard</h1>
        <div className="outbox1">
          <div className='inbox'>
            <div className="box1">
                <h2>{totalStudent.total}</h2>
                <h3>Students</h3>
            </div>
            <div className="box2">
                <h5><Link to='/studentfulldetails'>FULL DETAILS {'>>'}</Link></h5>
            </div>
          </div>
          <div className='inbox'>
            <div className="box1">
                <h2>{totalRooms.total}</h2>
                <h3>Rooms</h3>
            </div>
            <div className="box2">
                <h5><Link to='/roomdetails'>FULL DETAILS {'>>'}</Link></h5>
            </div>
          </div>
          <div className='inbox'>
            <div className="box1">
                <h2>{totalStudent.total}</h2>
                <h3>Students</h3>
            </div>
            <div className="box2">
                <h5>FULL DETAILS {'>>'}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default WardenDashboard