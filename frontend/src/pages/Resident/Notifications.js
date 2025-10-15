import React, { useState, useEffect } from "react";
import axios from "axios";
import "./notifications.css";

export default function NotificationsPage() {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user) return;

        const residentId = user._id;
        const res = await axios.get(`http://localhost:5000/api/violations/${residentId}`);
        setViolations(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchViolations();
  }, []);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="notifications-page">
      <h2>My Violations</h2>
      {violations.length === 0 ? (
        <p>No violations yet. Good job!</p>
      ) : (
        <table className="violations-table">
          <thead>
            <tr>
              <th>Violation</th>
              <th>Fine (₹)</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {violations.map((v) => (
              <tr key={v._id}>
                <td>{v.type}</td>
                <td>{v.fine}</td>
                <td>{v.status}</td>
                <td>{new Date(v.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
