import { useState } from "react";

export default function ReportViolation() {
  const [violations, setViolations] = useState(() => {
    return JSON.parse(localStorage.getItem("violations") || "[]");
  });
  const [form, setForm] = useState({ house: "", type: "", notes: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newViolation = {
      id: Date.now().toString(),
      house: form.house,
      type: form.type,
      notes: form.notes,
      status: "Pending Review", // admin will review
    };
    const updated = [...violations, newViolation];
    setViolations(updated);
    localStorage.setItem("violations", JSON.stringify(updated));
    setForm({ house: "", type: "", notes: "" });
    alert("Violation submitted for admin review!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Report Violation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="house"
          placeholder="House / Resident ID"
          value={form.house}
          onChange={handleChange}
          required
        />
        <br /><br />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Violation Type</option>
          <option value="Not separating waste">Not separating waste</option>
          <option value="Illegal dumping">Illegal dumping</option>
        </select>
        <br /><br />
        <textarea
          name="notes"
          placeholder="Additional notes"
          value={form.notes}
          onChange={handleChange}
        />
        <br /><br />
        <button type="submit">Submit Violation</button>
      </form>
    </div>
  );
}
