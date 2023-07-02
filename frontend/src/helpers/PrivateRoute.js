import { useKeycloak } from "@react-keycloak/web";
import NotLogged from "../pages/NotLogged";

const PrivateRoute = ({ children }) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  return isLoggedIn ? children : <NotLogged />;
};

export default PrivateRoute;
