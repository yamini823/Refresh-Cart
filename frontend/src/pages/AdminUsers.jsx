import { useEffect, useState } from "react";
import API from "../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import toast from "react-hot-toast";
import { Users, Mail, Phone, Calendar, Trash2, Search, X, ShieldAlert, CheckCircle, Loader } from "lucide-react";
import "./AdminDashboard.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users list");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete user "${name}"? This action cannot be undone.`)) {
      try {
        await API.delete(`/users/${id}`);
        toast.success("User deleted successfully! 🗑️");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user profile");
      }
    }
  };

  // Filter users by name or email
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <header className="admin-header">
          <div>
            <h1>User Management</h1>
            <p className="subtitle">View registered customers and manage user profiles</p>
          </div>
        </header>

        {/* Filter controls */}
        <div className="table-actions-bar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search users by name or email address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <X size={16} className="clear-icon" onClick={() => setSearchQuery("")} />
            )}
          </div>
        </div>

        {loading ? (
          <div className="admin-loader">
            <Loader size={36} className="spin" />
            <p>Loading users list...</p>
          </div>
        ) : (
          <div className="dashboard-section-card">
            <div className="table-wrapper">
              {filteredUsers.length === 0 ? (
                <p className="no-data">No users found.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Profile</th>
                      <th>Email & Contact</th>
                      <th>Joined Date</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id}>
                        {/* Profile Pic & Name */}
                        <td>
                          <div className="user-profile-cell">
                            <img
                              src={user.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                              alt={user.name}
                              className="user-avatar-img"
                              onError={(e) => {
                                e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                              }}
                            />
                            <div className="user-profile-info">
                              <span className="user-name">{user.name}</span>
                              {user.gender && <span className="user-subtext">{user.gender}</span>}
                            </div>
                          </div>
                        </td>

                        {/* Email & Contact info */}
                        <td>
                          <div className="user-contact-cell">
                            <div className="contact-row">
                              <Mail size={14} />
                              <span>{user.email}</span>
                            </div>
                            {user.phone && (
                              <div className="contact-row">
                                <Phone size={14} />
                                <span>{user.phone}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Joined Date */}
                        <td>
                          <div className="date-cell">
                            <Calendar size={14} />
                            {new Date(user.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                        </td>

                        {/* Verification Status */}
                        <td>
                          <div className="status-cell">
                            {user.isVerified ? (
                              <span className="status-badge verified">
                                <CheckCircle size={12} /> Verified
                              </span>
                            ) : (
                              <span className="status-badge pending">
                                <ShieldAlert size={12} /> Unverified
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Action buttons */}
                        <td>
                          <div className="actions-cell">
                            <button
                              className="icon-btn delete-btn"
                              onClick={() => handleDeleteUser(user._id, user.name)}
                              title="Delete user"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;