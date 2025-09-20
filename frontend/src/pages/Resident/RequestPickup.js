import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./pickup.css";

// helper: convert file to base64 (to save in localStorage)
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

export default function RequestPickup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    wasteType: "",
    quantity: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
    address: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // preload address if saved in "user"
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user?.address) setForm((s) => ({ ...s, address: user.address }));
  }, []);

  // show image preview
  useEffect(() => {
    if (!imageFile) return setPreview(null);
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleFile = (e) => {
    setImageFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.wasteType || !form.quantity) {
      alert("Please select waste type and quantity.");
      return;
    }
    setSubmitting(true);

    try {
      const imageBase64 = imageFile ? await fileToBase64(imageFile) : null;

      const pickups = JSON.parse(localStorage.getItem("pickups") || "[]");
      const newPickup = {
        id: Date.now().toString(),
        wasteType: form.wasteType,
        quantity: form.quantity,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        notes: form.notes,
        address: form.address,
        image: imageBase64,
        status: "pending", // default
        createdAt: new Date().toISOString(),
      };

      pickups.unshift(newPickup);
      localStorage.setItem("pickups", JSON.stringify(pickups));

      alert("Pickup request submitted!");
      navigate("/resident/my-pickups");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pickup-page">
      <h2>Request Extra Pickup</h2>
      <form className="pickup-form" onSubmit={handleSubmit}>
        <label>
          Waste Type
          <select
            name="wasteType"
            value={form.wasteType}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="dry">Dry / Recyclable</option>
            <option value="wet">Wet / Organic</option>
            <option value="hazardous">Hazardous</option>
            <option value="mixed">Mixed</option>
          </select>
        </label>

        <label>
          Quantity (approx.)
          <input
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="e.g. 2 bags / 5 kg"
            required
          />
        </label>

        <label>
          Preferred Pickup Date
          <input
            name="preferredDate"
            type="date"
            value={form.preferredDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Preferred Time
          <input
            name="preferredTime"
            type="time"
            value={form.preferredTime}
            onChange={handleChange}
          />
        </label>

        <label>
          Address
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Your address"
          />
        </label>

        <label>
          Notes
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any details (optional)"
          ></textarea>
        </label>

        <label>
          Photo (optional)
          <input type="file" accept="image/*" onChange={handleFile} />
        </label>

        {preview && (
          <div className="preview">
            <img src={preview} alt="preview" />
          </div>
        )}

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Request Pickup"}
        </button>
      </form>
    </div>
  );
}

