import { useEffect, useState } from "react";

export default function ManageViolations() {
  const [violations, setViolations] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("violations") || "[]");
    setViolations(stored);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = violations.map((v) =>
      v.id === id ? { ...v, status: newStatus } : v
    );
    setViolations(updated);
    localStorage.setItem("violations", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Violations</h2>
      {violations.length === 0 ? (
        <p>No violations reported yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>House/Resident</th>
              <th>Type</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {violations.map((v) => (
              <tr key={v.id}>
                <td>{v.house}</td>
                <td>{v.type}</td>
                <td>{v.notes}</td>
                <td>{v.status}</td>
                <td>
                  {v.status === "Pending Review" && (
                    <>
                      <button onClick={() => updateStatus(v.id, "Warning Sent")}>
                        Send Warning
                      </button>{" "}
                      <button onClick={() => updateStatus(v.id, "Fine Issued")}>
                        Issue Fine
                      </button>
                    </>
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
