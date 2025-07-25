import { Link } from "react-router-dom";
import "./Studentsidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/student-dashboard">Home</Link></li>
        <li><Link to="/complaints">Raise Complaint</Link></li>
        <li><Link to='/outpass'>Request OutPass</Link></li>
        <li><Link to='/request-room'>Request Room</Link></li>
        <li><Link to='/payments'>Payment</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
