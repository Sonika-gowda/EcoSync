import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pickup.css"; 
export default function MyPickups() {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user) return;

        const residentId = user._id;

        const response = await axios.get(`http://localhost:5000/api/pickups/${residentId}`);
        setPickups(response.data);
      } catch (err) {
        console.error("Error fetching pickups:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPickups();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="my-pickups-page">
      <h2>My Pickup Requests</h2>
      {pickups.length === 0 ? (
        <p>No pickup requests found.</p>
      ) : (
        <table className="pickups-table">
          <thead>
            <tr>
              <th>Waste Type</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {pickups.map((p) => (
              <tr key={p._id}>
                <td>{p.wasteType}</td>
                <td>{p.quantity}</td>
                <td>{p.preferredDate ? new Date(p.preferredDate).toLocaleDateString() : "-"}</td>
                <td>{p.preferredTime || "-"}</td>
                <td>{p.status}</td>
                <td>{p.notes || "-"}</td>
                <td>
                  {p.image ? (
                    <div className="image-preview-container">
                    <img src={p.image} alt="pickup" style={{ width: "50px", height: "50px" }} />
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
