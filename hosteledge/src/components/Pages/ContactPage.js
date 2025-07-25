// src/components/Pages/ContactPage.js
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>You can reach us through the details below. We’d love to hear from you!</p>

      <div className="contact-card">
        <h3>Email</h3>
        <p>support@hostel-edge.com</p>
      </div>

      <div className="contact-card">
        <h3>Phone</h3>
        <p>+91 98765 43210</p>
      </div>

      <div className="contact-card">
        <h3>Address</h3>
        <p>Shiv Nadar University,<br />Chennai, Tamil Nadu, India</p>
      </div>

      <div className="contact-card">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
