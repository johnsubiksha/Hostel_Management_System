// src/components/Pages/HomePage.js
import './HomePage.css'; // move relevant styles here

function HomePage() {
  return (
    <div className="banner">
      <video autoPlay loop muted playsInline>
        <source src="WhatsApp Video 2025-05-21 at 12.32.28_83d231c3.mp4" type="video/mp4" />
      </video>
      <div className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li className="login"><a href="/login">Login</a></li>
        </ul>
      </div>
      <div className="content-1">
        <h1>Hostel Management System</h1>
        <h4>Shiv Nadar University</h4>
        <button type="button"><a href="login">Get started</a></button>
      </div>
    </div>
  );
}

export default HomePage;
