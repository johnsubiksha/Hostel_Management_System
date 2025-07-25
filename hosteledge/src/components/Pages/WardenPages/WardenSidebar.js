import { Link } from "react-router-dom";
import "./WardenSidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/warden-dashboard">Home</Link></li>
        <li><Link to="/complaints-warden">Complaints</Link></li>
        <li><Link to='/outpass-warden'>OutPass</Link></li>
        <li><Link to='/add-room'>Add room</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;