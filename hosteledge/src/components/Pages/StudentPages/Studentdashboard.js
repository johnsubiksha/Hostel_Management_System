
import "./Studentdashboard.css";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
 
  return (
    <div className="dashboard-container">
      <div className="content">
        <h1>Welcome to Student Dashboard</h1>
        <div className="outbox1">
          <div className="inbox">
            <div className="box1">
              <h2>My Room</h2>
            </div>
            <div className="box2">
              <h5><Link to='/roomdetail'>FULL DETAILS {'>>'}</Link></h5>
            </div>
          </div>
          <div className="inbox">
            <div className="box1">
              <h2>Payment</h2>
            </div>
            <div className="box2">
              <h5><Link to='/roomdetail'>FULL DETAILS {'>>'}</Link></h5>
            </div>
          </div>
          <div className="inbox">
            <div className="box1">
              <h2>My Room</h2>
            </div>
            <div className="box2">
              <h5><Link to='/roomdetail'>FULL DETAILS {'>>'}</Link></h5>
            </div>
          </div>

          <div className="inbox">
            <div className="box1">
              <h2>Outpass</h2>
            </div>
            <div className="box2">
              <h5><Link to='/outpass'>FULL DETAILS {'>>'}</Link></h5>
            </div>
          </div>

          <div className="inbox">
            <div className="box1">
              <h2>Complaint</h2>
            </div>
            <div className="box2">
              <h5><Link to='/complaints'>FULL DETAILS {'>>'}</Link></h5>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
