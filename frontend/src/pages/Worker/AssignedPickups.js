import { useEffect, useState } from "react";

export default function AssignedPickups() {
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pickups") || "[]");
    setPickups(stored);
  }, []);

  const handleComplete = (id) => {
    const updated = pickups.map((p) =>
      p.id === id ? { ...p, status: "Collected" } : p
    );
    setPickups(updated);
    localStorage.setItem("pickups", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Assigned Pickups</h2>
      {pickups.length === 0 ? (
        <p>No pickups assigned yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Waste Type</th>
              <th>Address</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pickups.map((p) => (
              <tr key={p.id}>
                <td>{p.wasteType}</td>
                <td>{p.address}</td>
                <td>{p.date}</td>
                <td>{p.notes}</td>
                <td>{p.status || "Pending"}</td>
                <td>
                  {p.status !== "Collected" && (
                    <button onClick={() => handleComplete(p.id)}>
                      Mark as Collected
                    </button>
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
