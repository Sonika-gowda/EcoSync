// src/pages/Resident/MyComplaints.js
import { useEffect, useState } from "react";

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(saved);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Complaint</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.complaint}</td>
                <td>{c.location}</td>
                <td>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
