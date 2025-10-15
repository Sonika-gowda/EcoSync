// src/pages/Resident/MyComplaints.js
import { useEffect, useState } from "react";
import axios from "axios";
import "./MyComplaints.css";

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const residentId = localStorage.getItem("residentId");

  useEffect(() => {
    if (!residentId) return;
    axios.get(`http://localhost:5000/api/complaints/${residentId}`)
      .then(res => setComplaints(res.data))
      .catch(err => console.error(err));
  }, [residentId]);

  return (
    <div className="my-complaints-wrapper">
      <h2>My Complaints</h2>
      {complaints.length === 0 ? <p>No complaints submitted yet.</p> :
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Title</th><th>Description</th><th>Images</th><th>Status</th><th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map(c => (
              <tr key={c._id}>
                <td>{c.title}</td>
                <td>{c.description}</td>
                <td>
                  {c.images.length > 0 ? (
                    <div className="image-preview-container">
                      {c.images.map((img, idx) => (
                        <img key={idx} src={`http://localhost:5000/${img}`} alt={`complaint-${idx}`} />
                      ))}
                    </div>
                  ) : "No Images"}
                </td>
                <td>{c.status}</td>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}
