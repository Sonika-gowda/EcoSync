// src/pages/Resident/ComplaintForm.js
import { useState } from "react";

export default function ComplaintForm() {
  const [complaint, setComplaint] = useState("");
  const [location, setLocation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newComplaint = {
      id: Date.now(),
      complaint,
      location,
      status: "Pending",
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("complaints")) || [];
    existing.push(newComplaint);
    localStorage.setItem("complaints", JSON.stringify(existing));

    alert("Complaint submitted successfully!");
    setComplaint("");
    setLocation("");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Submit Complaint</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <textarea
          placeholder="Enter your complaint"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          required
          rows={4}
        />
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
