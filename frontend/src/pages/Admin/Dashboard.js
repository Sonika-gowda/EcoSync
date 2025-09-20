import { Link } from "react-router-dom";

export default function AdminDashboard() {
  // Dummy counts (later fetch from backend)
  const stats = {
    totalUsers: 12,
    totalResidents: 8,
    totalWorkers: 3,
    totalComplaints: 5,
    pendingPickups: 4,
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome Admin! Here’s an overview of the system.</p>

      {/* Stats Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div style={cardStyle}>
          <h3>Residents</h3>
          <p>{stats.totalResidents}</p>
        </div>
        <div style={cardStyle}>
          <h3>Workers</h3>
          <p>{stats.totalWorkers}</p>
        </div>
        <div style={cardStyle}>
          <h3>Complaints</h3>
          <p>{stats.totalComplaints}</p>
        </div>
        <div style={cardStyle}>
          <h3>Pending Pickups</h3>
          <p>{stats.pendingPickups}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div style={{ marginTop: "30px" }}>
        <h3>Quick Actions</h3>
        <ul>
          <li><Link to="/admin/users">Manage Users</Link></li>
          <li><Link to="/resident/my-complaints">View Complaints</Link></li>
          <li><Link to="/worker/assigned-pickups">View Pickups</Link></li>
        </ul>
      </div>
    </div>
  );
}

// Simple card styling
const cardStyle = {
  background: "#f4f4f4",
  padding: "15px",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};
