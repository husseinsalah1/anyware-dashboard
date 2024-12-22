import { Navigate, Outlet } from "react-router-dom";

const PreventRoute: React.FC = () => {
  const check: boolean = localStorage.getItem("anyware-token") ? false : true;
  console.log(check);

  return check ? <Outlet /> : <Navigate to="/" />;
};

export default PreventRoute;
