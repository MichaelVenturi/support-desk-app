import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

interface IPrivateRouteProps {
  redirectPath: string;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ redirectPath }) => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to={redirectPath} />;
};
export default PrivateRoute;
