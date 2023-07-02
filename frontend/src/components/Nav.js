import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import AdminRoute from "../helpers/AdminRoute";

const Nav = () => {
  const { keycloak } = useKeycloak();

  return (
    <div>
      <nav className="navbar">
        <h1 className="title">Projekt Bezpieczeństwo Aplikacji Webowych</h1>
        <ul className="links">
          <li>
            <a className="" href="/">
              Home
            </a>
          </li>
          <li>
            <a className="" href="/secured">
              Secured Page
            </a>
          </li>
          <AdminRoute>
            <li>
              <a className="" href="/admin">
                Admin Page
              </a>
            </li>
          </AdminRoute>
          <li>
            <a className="" href="/api1">
              First Secured API
            </a>
          </li>
          <li>
            <a className="" href="/api2">
              Second Secured API
            </a>
          </li>
        </ul>
        <div className="button-wrapper">
          {!keycloak.authenticated && (
            <button
              type="button"
              className="login-button"
              onClick={() => keycloak.login()}
            >
              Login with Keycloak
            </button>
          )}

          {!!keycloak.authenticated && (
            <button
              type="button"
              className="login-button"
              onClick={() => keycloak.logout()}
            >
              Logout ({keycloak.tokenParsed.preferred_username})
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
