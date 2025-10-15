import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      

      {/* Hero Section */}
      <section className="hero">
        <h2>Waste Management</h2>
        <p>A digital platform for a cleaner, green city.</p>
        <Link to="/register" className="cta-btn">Get Started</Link>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>👥 Residents</h3>
          <p>File complaints, track pickups, and stay updated.</p>
        </div>
        <div className="feature-card">
          <h3>👷 Workers</h3>
          <p>Manage routes, report violations, and ensure clean neighborhoods.</p>
        </div>
        <div className="feature-card">
          <h3>🛠 Admins</h3>
          <p>Oversee the system and resolve complaints efficiently.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Waste Management System | Clean City, Smart City</p>
      </footer>
    </div>
  );
}
