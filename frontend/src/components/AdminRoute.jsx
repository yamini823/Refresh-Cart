import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    if (user?.email?.toLowerCase() !== import.meta.env.VITE_ADMIN_EMAIL?.toLowerCase()) {
      return <Navigate to="/dashboard" replace />;
    }
  } catch (e) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AdminRoute;
