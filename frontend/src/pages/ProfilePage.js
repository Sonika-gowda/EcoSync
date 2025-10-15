import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({});

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");
  const email = storedUser?.email;

  const goBack = () => {
    navigate(-1); // <-- navigates to the previous page
  };

  useEffect(() => {
    if (role && email) {
      axios
        .get(`http://localhost:5000/api/profile/${role}/${email}`)
        .then((res) => {
          const data = res.data;
          if (!data.name) data.name = data.fullName || data.email || "Resident";
          setProfile(data);
          setUpdatedProfile(data);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load profile. Please try again.");
        });
    } else {
      setError("No user information found. Please login again.");
    }
  }, [role, email]);

  if (error) return <p className="error">{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      // Show preview immediately
      setProfile({ ...profile, profileImage: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    for (const key in updatedProfile) formData.append(key, updatedProfile[key]);
    if (imageFile) formData.append("profileImage", imageFile);

    axios
      .put(`http://localhost:5000/api/profile/${role}/${email}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setProfile(res.data);
        setEditMode(false);
        alert("Profile updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update profile.");
      });
  };

  return (
    <div className="profile-container">
      {/* Back Button */}
      <button className="back-btn" onClick={goBack}>
        ← Back
      </button>
      <h2>{role?.toUpperCase()} Profile</h2>
      <div className="profile-card">
        {/* Profile Image (Clickable) */}
        <div className="profile-image-section">
  <label htmlFor="profile-upload">
    {profile.profileImage ? (
      <img
        src={
      profile.profileImage.startsWith("http")
        ? profile.profileImage
        : `http://localhost:5000${profile.profileImage}`
    }
        alt="Profile"
        className="profile-image"
      />
    ) : (
      <div className="profile-placeholder">
        <i className="fa fa-user"></i>
      </div>
    )}
  </label>
  <input
    type="file"
    id="profile-upload"
    accept="image/*"
    style={{ display: "none" }}
    onChange={handleImageChange}
  />
</div>


        {/* Editable Fields */}
        <div className="profile-fields">
          <p>
            <strong>Name:</strong>{" "}
            {editMode ? (
              <input
                type="text"
                name="name"
                value={updatedProfile.name}
                onChange={handleChange}
              />
            ) : (
              profile.name
            )}
          </p>
          <p><strong>Email:</strong> {profile.email}</p>

          {role === "resident" && (
            <>
              <p>
                <strong>Address:</strong>{" "}
                {editMode ? (
                  <input
                    type="text"
                    name="address"
                    value={updatedProfile.address || ""}
                    onChange={handleChange}
                  />
                ) : (
                  profile.address || "-"
                )}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {editMode ? (
                  <input
                    type="text"
                    name="phone"
                    value={updatedProfile.phone || ""}
                    onChange={handleChange}
                  />
                ) : (
                  profile.phone || "-"
                )}
              </p>
              <p>
                <strong>House Number:</strong>{" "}
                {editMode ? (
                  <input
                    type="text"
                    name="houseNumber"
                    value={updatedProfile.houseNumber || ""}
                    onChange={handleChange}
                  />
                ) : (
                  profile.houseNumber || "-"
                )}
              </p>
            </>
          )}

          {role === "worker" && (
            <>
              <p>
                <strong>Phone:</strong>{" "}
                {editMode ? (
                  <input
                    type="text"
                    name="phone"
                    value={updatedProfile.phone || ""}
                    onChange={handleChange}
                  />
                ) : (
                  profile.phone || "-"
                )}
              </p>
              
            </>
          )}

          {role === "admin" && <p><strong>Role:</strong> {profile.role || role}</p>}

          <p>
            <strong>Created At:</strong>{" "}
            {profile.createdAt
              ? new Date(profile.createdAt).toLocaleString()
              : "-"}
          </p>
        </div>

        {/* Edit / Save Buttons */}
        <div className="profile-actions">
          {editMode ? (
            <>
              <button onClick={handleSave} className="btn save-btn">
                Save
              </button>
              <button onClick={() => setEditMode(false)} className="btn cancel-btn">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)} className="btn edit-btn">
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
