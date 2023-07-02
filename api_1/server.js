const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cors = require("cors");
const app = express();
const port = 3001;

const { NodeAdapter } = require("ef-keycloak-connect");
const config = {
  realm: "keycloak-react-auth",
  "auth-server-url": "http://localhost:8080/",
  "ssl-required": "external",
  resource: "my-react-app-pkce",
  "public-client": true,
  "verify-token-audience": true,
  "use-resource-role-mappings": true,
  "confidential-port": 0,
};
const keycloak = new NodeAdapter(config);

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(keycloak.middleware());
app.use(cors());

app.get("/", keycloak.protect(), (req, res) => {
  const token = req.kauth.grant.access_token.token;
  const decodedToken = jwt.decode(token, { complete: true });

  if (decodedToken) {
    const roles = decodedToken.payload.realm_access.roles || [];
    const response = roles.includes("admin")
      ? {
          role: "an admin user",
          src: "https://media.npr.org/assets/img/2016/06/17/whatafishknows_wide-e2b0800c202b1751ffddfae6394e3c7825e7d333-s1400-c100.jpg",
        }
      : {
          role: "a regular user",
          src: "https://media.istockphoto.com/id/1350766651/photo/macro-goldfish-face.jpg?s=612x612&w=0&k=20&c=xi5CEQ2wpXBbN_p_L1Lq39osMUX5Blxw9DO5q43cXa0=",
        };

    res.json(response);
  } else {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
