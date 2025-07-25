import React, { useEffect } from 'react'
import WardenSidebar from './WardenSidebar'
import {useState} from 'react'
import axios from 'axios';
import Sidebar from './WardenSidebar';
import './StudentDetails.css'
const StudentDetails = ()=>{
    const [students,setStudents] = useState([]);

    useEffect(()=>{
        fetchStudentDetails();
    },[]);

    const fetchStudentDetails = async ()=>{
        try{
            const res = await axios.get("http://localhost:5000/studentdetails");
            setStudents(res.data);
        }
        catch(err){
            console.error(err);
        }
    }


    return(
        <>
            <WardenSidebar />
            <div className='student'>
                <h2>All Student details</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Rool Number</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Year</th>
                            <th>Room Number</th>
                            <th>Room Type</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(students) && students.length>0 ? (
                        students.map((s)=>(
                            <tr key={s.register_number}>
                                <td>{s.register_number}</td>
                                <td>{s.name}</td>
                                <td>{s.department}</td>
                                <td>{s.year}</td>
                                <td>{s.room_number}</td>
                                <td>{s.room_type}</td>
                            </tr>
                        ))
                    ):(
                    <tr>
                        <td colSpan="9">No Outpass Requests Found</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        </>
        
    );
};

export default StudentDetails;