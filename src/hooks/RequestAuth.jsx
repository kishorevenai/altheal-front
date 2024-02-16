import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentToken } from "../features/Auth/authSlice";
const RequestAuth = () => {
  const location = useLocation();

  const token = useSelector(selectCurrentToken);
  const content = token ? (
     <Outlet/>
  ) : (
    // <Outlet/>
    <Navigate to="/" state={{ form: location }} replace />
  );
  return content;
};

export default RequestAuth;
