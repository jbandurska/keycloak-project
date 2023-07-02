import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";

const Api1 = () => {
  const { keycloak, initialized } = useKeycloak();
  const [photoSrc, setPhotoSrc] = useState("");
  const [role, setRole] = useState("");

  const requestApi1 = useMemo(() => {
    return async () => {
      try {
        const response = await axios.get("http://localhost:3001/", {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
          },
        });
        setPhotoSrc(response.data.src);
        setRole(response.data.role);
      } catch (err) {
        console.error(err);
      }
    };
  }, [keycloak]);

  useEffect(() => {
    if (initialized) {
      requestApi1();
    }
  }, [initialized, requestApi1]);

  return (
    <div className="inner-page">
      <h1>Welcome to the first API!</h1>
      <h4>You are {role}.</h4>
      <div className="center-wrapper">
        <img alt="fish" src={photoSrc} />
      </div>
    </div>
  );
};

export default Api1;
