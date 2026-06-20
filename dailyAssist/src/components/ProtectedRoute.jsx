import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const stored = localStorage.getItem("user");
  const token  = localStorage.getItem("token");

  // Not logged in at all — redirect to login
  if (!stored || !token) {
    return <Navigate to="/staff-login" replace />;
  }

  let user;
  try {
    user = JSON.parse(stored);
  } catch {
    return <Navigate to="/staff-login" replace />;
  }

  // Logged in but wrong role — redirect to login
  if (allowedRoles && !allowedRoles.includes(user.role?.toLowerCase())) {
    return <Navigate to="/staff-login" replace />;
  }

  return children;
}