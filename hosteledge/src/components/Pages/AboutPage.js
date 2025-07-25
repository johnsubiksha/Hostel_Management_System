// src/components/Pages/AboutPage.js
import './AboutPage.css';

function AboutPage() {
  const team = [
    {
      name: "A. John Subiksha",
      role: "Student",
      photo: "/photo1.jpg",
      instagram: "https://instagram.com/username1",
      linkedin: "https://linkedin.com/in/username1",
      twitter: "https://twitter.com/username1",
    },
    {
      name: "M.Deepa Lakshmi",
      role: "Backend Developer",
      photo: "/photo1.jpg",
      instagram: "https://instagram.com/username2",
      linkedin: "https://linkedin.com/in/username2",
      twitter: "https://twitter.com/username2",
    },
    {
      name: "A.Kanchana",
      role: "UI/UX Designer",
      photo: "/photo1.jpg",
      instagram: "https://instagram.com/your_instagram",
      linkedin: "https://linkedin.com/in/your_linkedin",
      twitter: "https://twitter.com/your_twitter",
    },
    {
      name: "S.Jeevitha",
      role: "Full Stack Developer",
      photo: "/photo1.jpg",
      instagram: "https://instagram.com/member4",
      linkedin: "https://linkedin.com/in/member4",
      twitter: "https://twitter.com/member4",
    },
    {
      name: "S.Jeevitha",
      role: "Database Manager",
      photo: "/photo1.jpg",
      instagram: "https://instagram.com/member5",
      linkedin: "https://linkedin.com/in/member5",
      twitter: "https://twitter.com/member5",
    }
  ];

  return (
    <div className="about-container">
      <h2>Meet Our Team</h2>
      <div className="team-grid">
        {team.map((member, index) => (
          <div className="profile-card" key={index}>
            <img src={member.photo} alt={member.name} className="profile-photo" />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <div className="social-icons">
              <a href={member.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
              <a href={member.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutPage;
