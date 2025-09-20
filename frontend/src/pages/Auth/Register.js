import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    //const password = e.target.password.value;
    const role = e.target.role.value;

    // Store in localStorage (simulating registration)
    localStorage.setItem("residentName", name);
    localStorage.setItem("residentEmail", email);
    localStorage.setItem("role", role);

    // Redirect based on role
    if (role === "resident") navigate("/resident/dashboard");
    else if (role === "worker") navigate("/worker/dashboard");
    else if (role === "admin") navigate("/admin/dashboard");
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" name="name" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />

          {/* Role selection */}
          <select name="role" required>
            <option value="">Select Role</option>
            <option value="resident">Resident</option>
            <option value="worker">Worker</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Register</button>
        </form>

        {/* Link to Login */}
        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
