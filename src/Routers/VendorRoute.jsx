import { Navigate } from "react-router";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Components/LoadingSpinner";

const VendorRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;
  if (role === "vendor") return children;
  return <Navigate to="/" replace="true" />;
};

export default VendorRoute;
