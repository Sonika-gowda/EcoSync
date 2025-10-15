// src/pages/Resident/ComplaintForm.js
import { useState } from "react";
import axios from "axios";
import "./ComplaintForm.css";

export default function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // Assuming you have residentId stored in localStorage after login
  const residentId = localStorage.getItem("residentId");

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!residentId) {
      alert("Resident not logged in!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("residentId", residentId);
      formData.append("title", title);
      formData.append("description", description);
      images.forEach((image) => formData.append("images", image));

      const res = await axios.post("http://localhost:5000/api/complaints", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Complaint submitted successfully!");
      console.log(res.data);

      // Reset form
      setTitle("");
      setDescription("");
      setImages([]);
      setPreviewImages([]);
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Error submitting complaint");
    }
  };

  return (
    <div className="complaint-form-wrapper">
      <h2>Submit Complaint</h2>
      <form className="complaint-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter your complaint"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        {previewImages.length > 0 && (
          <div className="image-preview-container">
            {previewImages.map((img, index) => (
              <img key={index} src={img} alt={`preview-${index}`} />
            ))}
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
