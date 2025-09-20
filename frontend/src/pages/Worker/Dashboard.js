import { Link } from "react-router-dom";
export default function WorkerDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Worker Dashboard</h2>
      <p>Welcome! From here, you can:</p>
      <ul>
        <li>Report Violations</li>
        <li>Check Assigned Areas (later)</li>
      </ul>
      <ul>
        <li><Link to="/worker/report">Report Violation</Link></li>
        <li><Link to="/worker/assigned-pickups">Assigned Pickups</Link></li>
        {/* Future: <li><Link to="/worker/my-reports">My Reports</Link></li> */}
      </ul>
    </div>
  );
}
