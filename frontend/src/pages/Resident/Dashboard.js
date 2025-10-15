import React, { useEffect, useState } from "react";
import "./Dashboard.css"; 

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // new state for loading

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setLoading(false); // stop loading regardless
    }
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container" style={{ textAlign: "center", padding: "50px" }}>
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h2>
          👋 Hi {user?.name || "Resident"}, Welcome to EcoSync
        </h2>
        <p>Here’s what you can do on your Resident Portal:</p>
      </header>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Your dashboard cards remain unchanged */}
        <div className="dashboard-card">
          <h3>📝 Submit Complaint</h3>
          <p>Report issues in your neighborhood such as:</p>
          <ul>
            <li>Missed garbage collection</li>
            <li>Overflowing bins or waste pile-up</li>
            <li>Illegal dumping complaints</li>
            <li>Cleanliness or sanitation concerns</li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h3>📋 My Complaints</h3>
          <p>Easily track your submitted complaints:</p>
          <ul>
            <li>View current status (Pending / In-progress / Resolved)</li>
            <li>Edit or update complaint details</li>
            <li>Check resolution notes from authorities</li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h3>🚛 Request Pickup</h3>
          <p>Schedule waste pickups at your convenience:</p>
          <ul>
            <li>Book pickups for household waste</li>
            <li>Request bulk waste removal (e.g. furniture, appliances)</li>
            <li>Request e-waste / recycling collection</li>
            <li>Choose preferred date & time</li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h3>📦 My Pickups</h3>
          <p>Manage your scheduled pickups:</p>
          <ul>
            <li>Check scheduled pickup details</li>
            <li>Modify or cancel a request</li>
            <li>Track real-time pickup status</li>
            <li>View pickup history</li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h3>🔔 Notifications</h3>
          <p>Stay updated with important alerts:</p>
          <ul>
            <li>Pickup confirmation & reminders</li>
            <li>Complaint resolution updates</li>
            <li>Community announcements</li>
            <li>Emergency sanitation alerts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
