import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, redirectURL = "/sign-in" }) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to={redirectURL} replace/>;
  }

  return children;
}

export default ProtectedRoute;