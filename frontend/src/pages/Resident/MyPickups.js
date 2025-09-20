import React, { useEffect, useState } from "react";
import "./pickup.css";

export default function MyPickups() {
  const [pickups, setPickups] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pickups") || "[]");
    setPickups(stored);
  }, []);

  // Cancel a pickup request
  const handleCancel = (id) => {
    if (!window.confirm("Cancel this pickup request?")) return;
    const updated = pickups.map((p) =>
      p.id === id ? { ...p, status: "cancelled" } : p
    );
    setPickups(updated);
    localStorage.setItem("pickups", JSON.stringify(updated));
  };

  return (
    <div className="pickup-list-page">
      <h2>My Pickup Requests</h2>
      {pickups.length === 0 ? (
        <p>
          No pickup requests found.{" "}
          <a href="/resident/request-pickup">Request one</a>.
        </p>
      ) : (
        <table className="pickup-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Waste</th>
              <th>Quantity</th>
              <th>Date/Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pickups.map((p) => (
              <tr key={p.id}>
                <td>{p.id.slice(-6)}</td>
                <td>{p.wasteType}</td>
                <td>{p.quantity}</td>
                <td>
                  {p.preferredDate || "-"} {p.preferredTime || ""}
                </td>
                <td>{p.status}</td>
                <td>
                  {p.status === "pending" && (
                    <button
                      className="btn-cancel"
                      onClick={() => handleCancel(p.id)}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    className="btn-view"
                    onClick={() =>
                      alert(JSON.stringify(p, null, 2))
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
