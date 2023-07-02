import { useKeycloak } from "@react-keycloak/web";

const AdminRoute = ({ children }) => {
  const { keycloak } = useKeycloak();

  const isAdmin = keycloak.authenticated && keycloak.hasRealmRole("admin");

  return isAdmin ? children : null;
};

export default AdminRoute;
