const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
const port = 3002;

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
  res.json({
    src: "https://www.thesafaricollection.com/wp-content/uploads/2022/07/The-Safari-Collection-Hey-You-Giraffe-Manor-1.jpg",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
