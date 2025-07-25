
import Login from "./components/Pages/Login";
import { Routes,Route } from "react-router-dom";
import WardenDashboard from "./components/Pages/WardenPages/WardenDashboard";
import StudentDashboard from './components/Pages/StudentPages/Studentdashboard';
import Complaints from "./components/Pages/StudentPages/Complaints";
import Outpass from './components/Pages/StudentPages/Outpass'
import OutpassRequest from "./components/Pages/WardenPages/OutpassRequest";
import ViewComplaints from "./components/Pages/WardenPages/ViewComplaints";
import RoomRequestForm from './components/Pages/StudentPages/RoomRequestForm'
import Payments from "./components/Pages/StudentPages/Payment";
import HomePage from "./components/Pages/HomePage";
import StudentDetails from "./components/Pages/WardenPages/StudentDetails";
import RoomDetails from "./components/Pages/WardenPages/RoomsDetails"
import AboutPage from './components/Pages/AboutPage'
import ContactPage from './components/Pages/ContactPage'
import AddRoom from "./components/Pages/WardenPages/AddRoom";
import Room from "./components/Pages/StudentPages/Room";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/warden-dashboard" element={<WardenDashboard />} />
      <Route path="/complaints" element={<Complaints />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path='/outpass' element={<Outpass />} />
      <Route path='/outpass-warden' element={<OutpassRequest />} />
      <Route path = '/complaints-warden' element={<ViewComplaints />} />
      <Route path="/Request-room" element={<RoomRequestForm />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/studentfulldetails" element={<StudentDetails />} />
      <Route path="/roomdetails" element={<RoomDetails />} />
      <Route path='/add-room' element={<AddRoom />} />
            <Route path='/roomdetail' element={<Room />} />
    </Routes>
  );
}

export default App;
