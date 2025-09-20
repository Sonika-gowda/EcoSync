import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useRole } from "../store/RoleContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { role, setRole } = useRole();

  function handleLogout() {
    setRole(null);
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <h2 className="logo">♻ Waste Management</h2>
      <ul className="nav-links">
        {!role && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login" className="login-btn">Login</Link></li>
            <li><Link to="/register" className="login-btn">Register</Link></li>
          </>
        )}

        {role === "resident" && (
          <>
            <li><Link to="/resident/dashboard">Dashboard</Link></li>
            <li><Link to="/resident/complaint">Complaint</Link></li>
            <li><Link to="/resident/my-complaints">My Complaints</Link></li>
            <li><Link to="/resident/request-pickup">Request Pickup</Link></li>
            <li><Link to="/resident/my-pickups">My Pickups</Link></li>
            <li><Link to="/resident/notifications">Notifications</Link></li>
          </>
        )}

        {role === "worker" && (
          <>
            <li><Link to="/worker/dashboard">Dashboard</Link></li>
            <li><Link to="/worker/report">Report Violation</Link></li>
            <li><Link to="/worker/assigned-pickups">Assigned Pickups</Link></li>
          </>
        )}

        {role === "admin" && (
          <>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/users">Manage Users</Link></li>
            <li><Link to="/admin/complaints">View Complaints</Link></li>
            <li><Link to="/admin/pickups">View Pickups</Link></li>
          </>
        )}

        {role && (
          <li>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
