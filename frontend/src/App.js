import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Securedpage";
import PrivateRoute from "./helpers/PrivateRoute";
import AdminPage from "./pages/Adminpage";
import Api1 from "./pages/Api1";
import AdminRoute from "./helpers/AdminRoute";
import Api2 from "./pages/Api2";

function App() {
  return (
    <div className="main">
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ pkceMethod: "S256" }}
      >
        <Nav />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<WelcomePage />} />
            <Route
              path="/secured"
              element={
                <PrivateRoute>
                  <SecuredPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
            <Route
              path="/api1"
              element={
                <PrivateRoute>
                  <Api1 />
                </PrivateRoute>
              }
            />
            <Route
              path="/api2"
              element={
                <PrivateRoute>
                  <Api2 />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
