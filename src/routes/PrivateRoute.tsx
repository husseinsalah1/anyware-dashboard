import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const check: boolean = localStorage.getItem("anyware-token") ? true : false;

  return check ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
