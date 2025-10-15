import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    address: "",
    phone: "",
    houseNumber: "",
    adminRole: ""
  });

  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  }

  // ✅ Password validation
  function validatePassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      );
    } else {
      setPasswordError("");
    }
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (passwordError) {
      setMessage("Please fix password requirements ❌");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
        
       console.log("Register Response:", res.data);

      if (res.data.success) {
        setMessage("Registration successful ✅ Redirecting...");

        // ⏳ Redirect after 2 seconds
        setTimeout(() => {
          if (formData.role === "resident") navigate("/resident/dashboard");
          else if (formData.role === "worker") navigate("/worker/dashboard");
          else if (formData.role === "admin") navigate("/admin/dashboard");
        }, 2000);
      } else {
        setMessage(res.data.message || "Registration failed ❌");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error ❌");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          {passwordError && <p style={{ color: "red", fontSize: "14px" }}>{passwordError}</p>}

          {/* Role Selection */}
          <select name="role" required onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="resident">Resident</option>
            <option value="worker">Worker</option>
            <option value="admin">Admin</option>
          </select>

          {/* Conditional Fields */}
          {formData.role === "resident" && (
            <>
              <input type="text" name="address" placeholder="Address" required onChange={handleChange} />
              <input type="text" name="phone" placeholder="Phone" required onChange={handleChange} />
              <input type="text" name="houseNumber" placeholder="House Number" required onChange={handleChange} />
            </>
          )}

          {formData.role === "worker" && (
            <>
              <input type="text" name="phone" placeholder="Phone" required onChange={handleChange} />
              
            </>
          )}

          {formData.role === "admin" && (
            <>
              <input
                type="text"
                name="adminRole"
                placeholder="Admin Role (e.g. superadmin)"
                onChange={handleChange}
              />
            </>
          )}

          <button type="submit">Register</button>
        </form>

        {message && <p style={{ marginTop: "10px", textAlign: "center" }}>{message}</p>}

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
