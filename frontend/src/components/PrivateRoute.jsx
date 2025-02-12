import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
