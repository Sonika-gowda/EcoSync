import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useRole } from "../../store/RoleContext";
import axios from "axios";
export default function Login() {
  const navigate = useNavigate();
  const { setRole } = useRole();

  function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

  axios.post("http://localhost:5000/api/auth/login", { email, password, role })
    .then(res => {
     // localStorage.setItem("user", JSON.stringify(res.data));
   localStorage.setItem("residentEmail", email);
    setRole(role);

      if (role === "resident") navigate("/resident/dashboard");
      else if (role === "worker") navigate("/worker/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
    })
    .catch(err => alert(err.response.data.message));
}
 
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />

          <select name="role" required>
            <option value="">Select Role</option>
            <option value="resident">Resident</option>
            <option value="worker">Worker</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Login</button>
        </form>
        <p className="forgot-link"><Link to="/forgot-password">Forgot Password?</Link></p>
         <p style={{ marginTop: "10px", textAlign: "center" }}>
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
