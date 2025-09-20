import { Link } from "react-router-dom";

export default function ResidentDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Resident Dashboard</h2>
      <p>Welcome! From here, you can:</p>
      <ul>
        <li>File a Complaint</li>
        <li>Track Your Complaints</li>
        <li>View Collection Schedule (later)</li>
      </ul>
       <ul>
        <li><Link to="/resident/complaint">Submit Complaint</Link></li>
        <li><Link to="/resident/my-complaints">My Complaints</Link></li>
        <li><Link to="/resident/request-pickup">Request Pickup</Link></li>
        <li><Link to="/resident/my-pickups">My Pickups</Link></li>
        <li><Link to="/resident/notifications">Notifications</Link></li>
      </ul>
    </div>
  );
}
