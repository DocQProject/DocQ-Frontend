import { Navigate } from "react-router-dom";

function PublicRoute({ children, redirectURL = "/" }) {
  const token = localStorage.getItem("accessToken");

  if (token) {
    return <Navigate to={redirectURL} replace/>;
  }

  return children;
}

export default PublicRoute;