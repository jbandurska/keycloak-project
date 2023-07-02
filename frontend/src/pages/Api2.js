import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";

const Api2 = () => {
  const { keycloak, initialized } = useKeycloak();
  const [photoSrc, setPhotoSrc] = useState("");

  const requestApi2 = useMemo(() => {
    return async () => {
      try {
        const response = await axios.get("http://localhost:3002/", {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
          },
        });
        const src = response.data.src;
        setPhotoSrc(src);
      } catch (err) {
        console.error(err);
      }
    };
  }, [keycloak]);

  useEffect(() => {
    if (initialized) {
      requestApi2();
    }
  }, [initialized, requestApi2]);

  return (
    <div className="inner-page">
      <h1>Welcome to the second API!</h1>
      <div className="center-wrapper">
        <img alt="giraffe" src={photoSrc} />
      </div>
    </div>
  );
};

export default Api2;
