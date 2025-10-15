import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ResidentDashboard from "./pages/Resident/Dashboard";
import ComplaintForm from "./pages/Resident/ComplaintForm";
import MyComplaints from "./pages/Resident/MyComplaints";
import WorkerDashboard from "./pages/Worker/Dashboard";
import ReportViolation from "./pages/Worker/ReportViolation";
import AdminDashboard from "./pages/Admin/Dashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import RequestPickup from "./pages/Resident/RequestPickup";
import MyPickups from "./pages/Resident/MyPickups";
import AssignedPickups from "./pages/Worker/AssignedPickups";
import ManageViolations from "./pages/Admin/ManageViolations";
import Notifications from "./pages/Resident/Notifications";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProfilePage from "./pages/ProfilePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Added */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Resident */}
        <Route path="/resident/dashboard" element={<ResidentDashboard />} />
        <Route path="/resident/complaint" element={<ComplaintForm />} />
        <Route path="/resident/my-complaints" element={<MyComplaints />} />
        <Route path="/resident/request-pickup" element={<RequestPickup />} />
        <Route path="/resident/my-pickups" element={<MyPickups />} />
        <Route path="/resident/notifications" element={<Notifications />} />

        {/* Worker */}
        <Route path="/worker/dashboard" element={<WorkerDashboard />} />
        <Route path="/worker/report" element={<ReportViolation />} />
        <Route path="/worker/assigned-pickups" element={<AssignedPickups />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/violations" element={<ManageViolations />} />

        {/* Fallback */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
