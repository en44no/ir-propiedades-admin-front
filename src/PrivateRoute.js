import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component }) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    return component;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
