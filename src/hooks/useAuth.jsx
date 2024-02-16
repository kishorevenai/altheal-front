import { selectCurrentToken } from "../features/Auth/authSlice";
import { useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isPractisioner = false;
  let HealthCoach = false;
  let isMember = true;

  if (token) {
    const decode = jwtDecode(token);
    return decode;
  }
  return "20";
};

export default useAuth;
