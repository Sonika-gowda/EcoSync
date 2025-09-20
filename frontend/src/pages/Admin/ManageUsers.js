import { useState } from "react";

export default function ManageUsers() {
  // Dummy users (later replace with backend API call)
  const [users, setUsers] = useState([
    { id: 1, name: "Ravi Kumar", email: "ravi@example.com", role: "resident" },
    { id: 2, name: "Anita Sharma", email: "anita@example.com", role: "resident" },
    { id: 3, name: "Suresh Yadav", email: "suresh@example.com", role: "worker" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleRoleChange = (id, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Users</h2>
      <p>Here the admin can view, delete, or change roles of users.</p>

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="resident">Resident</option>
                    <option value="worker">Worker</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
