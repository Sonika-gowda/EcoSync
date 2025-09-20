import { useEffect, useState } from "react";

export default function Notifications() {
  const [myNotices, setMyNotices] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("residentEmail");
    const all = JSON.parse(localStorage.getItem("violations") || "[]");

    // Show only for logged-in resident
    const mine = all.filter(
      (v) =>
        v.residentEmail === email &&
        (v.status === "Warning Sent" || v.status === "Fine Issued")
    );

    setMyNotices(mine);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Notifications</h2>
      {myNotices.length === 0 ? (
        <p>No notifications yet 🎉</p>
      ) : (
        <ul>
          {myNotices.map((n) => (
            <li key={n.id}>
              🏠 <strong>{n.house}</strong> — {n.status}
              <br />
              <em>({n.type}: {n.notes})</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
