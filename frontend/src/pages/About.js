import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <h2>About Our Smart Waste Management System</h2>
      <p>
        Our platform is designed to make waste management efficient, sustainable, and transparent.
        Residents, workers, and administrators can all benefit from digital tools that simplify
        reporting, tracking, and monitoring waste management processes.
      </p>

      <h3>Our Mission 🌱</h3>
      <p>
        To build cleaner and greener communities through technology-driven waste management solutions,
        promoting sustainability and accountability in urban environments.
      </p>

      <h3>Key Features ⚡</h3>
      <div className="features-grid">
        <div className="feature-card">
          <h4>Resident Dashboard</h4>
          <p>Track complaints, report issues, and check violation fines easily.</p>
        </div>
        <div className="feature-card">
          <h4>Worker Dashboard</h4>
          <p>View assigned routes, report collections, and manage daily tasks efficiently.</p>
        </div>
        <div className="feature-card">
          <h4>Admin Control</h4>
          <p>Monitor all activities, generate reports, and ensure compliance across the city.</p>
        </div>
        <div className="feature-card">
          <h4>Smart Notifications</h4>
          <p>Real-time alerts for residents and workers for better engagement.</p>
        </div>
      </div>

      <h3>Why Choose Us?</h3>
      <ul>
        <li>✅ Streamlined waste reporting and tracking</li>
        <li>✅ Transparency and accountability for all users</li>
        <li>✅ Sustainability-focused approach</li>
        <li>✅ User-friendly interface for residents and workers</li>
      </ul>

      <h3>Meet the Team 👩‍💻👨‍💻</h3>
      <div className="team-grid">
        <div className="team-card">
          <h4>Sonika</h4>
          <p>Project Lead</p>
        </div>
        <div className="team-card">
          <h4>Sushmitha L</h4>
          <p>Backend Developer</p>
        </div>
        <div className="team-card">
          <h4>Vandana</h4>
          <p>Frontend Developer</p>
        </div>
      </div>

      <p className="closing-text">
        Together, we aim to make cities cleaner, smarter, and more sustainable. Join us in building
        a greener future! 🌍
      </p>
    </div>
  );
}
