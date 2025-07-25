import { useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import './Login.css';
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log("Response:", response.data);
      if (response.data.success) {
        const { token, role } = response.data;
        console.log("Token:", token, "Role:", role);
        
        localStorage.setItem("token", token); 
        localStorage.setItem("role", role);

        if (onLogin) {
          onLogin(token);  // Ensure onLogin is called
        }

        if (role === "warden") {
          navigate("/warden-dashboard");
        } 
        else if (role === "student") {
          navigate("/student-dashboard");
        }
        else {
        setError("Invalid role. Please contact admin.");
        }
      } 
      else {
        setError("Invalid email or password");
      }
    }
    catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-bg">
      <div className='wrapper'>
        <form onSubmit={handleLogin}>
          <h2>Hostel Edge</h2>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon"/>
          </div>
          <div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href='#'>Forgot password?</a>
          </div>
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
