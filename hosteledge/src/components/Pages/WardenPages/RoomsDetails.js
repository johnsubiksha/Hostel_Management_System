import react, { useEffect,useState} from 'react'
import WardenSidebar from './WardenSidebar'
import './RoomDetails.css';
import axios from 'axios';
const RoomDetails = ()=>{
    const [rooms,setRooms] = useState([]);

    useEffect(()=>{
        fetchRoomDetails();
    },[])

    const fetchRoomDetails = async ()=>{
        try{
            const res = await axios.get("http://localhost:5000/roomdetails");
            setRooms(res.data)
        }
        catch(err)
        {
            console.log(err);
        }
    }
    return(
         <>
            <WardenSidebar />
            <div className='room'>
                <h2>All Room details</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Rool Id</th>
                            <th>Room Number</th>
                            <th>room_type</th>
                            <th>Capacity</th>
                            <th>AC_status</th>
                            <th>Is_Available</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(rooms) && rooms.length>0 ? (
                        rooms.map((r)=>(
                            <tr key={r.room_id}>
                                <td>{r.room_id}</td>
                                <td>{r.room_number}</td>
                                <td>{r.room_type}</td>
                                <td>{r.capacity}</td>
                                <td>{r.ac_status}</td>
                                <td>{r.is_available ? 'Yes' : "No"}</td>
                            </tr>
                        ))
                    ):(
                    <tr>
                        <td colSpan="9">No Rooms Found</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        </>
        
    );
}

export default RoomDetails;