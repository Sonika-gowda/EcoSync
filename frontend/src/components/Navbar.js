import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { useRole } from "../store/RoleContext";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { role, setRole } = useRole();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  function handleLogout() {
    setRole(null);
    navigate("/login");
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <h2 className="logo">♻ EcoSync</h2>
      <ul className="nav-links">
        {!role && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
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
          <li className="profile-menu" ref={dropdownRef}>
            <FaUserCircle
              className="profile-icon"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="dropdown">
                <Link to="/profile" // dynamically builds /resident/profile, /worker/profile, etc.
                 onClick={() => setOpen(false)}>
                  Profile
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}
