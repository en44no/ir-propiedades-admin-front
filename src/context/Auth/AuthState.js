import axios from "axios";
import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const [userRealName, setUserRealName] = useState("Usuario");
  const [userRoles, setUserRoles] = useState("");

  const authenticateUser = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/auth/signin`, data)
      .then((res) => {
        if (res.data.token) {
          sessionStorage.setItem("token", res.data.token);
          data.isAuthenticated = true;
          getUser(data.username);
        } else {
          data.isAuthenticated = false;
        }
      })
      .catch((error) => {});
  };

  const getUser = async (username) => {
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/users/`)
      .then((res) => {
        const user = res.data.find((user) => user.username === username);
        sessionStorage.setItem("userLoggedName", user.name.split(" ")[0]);
        sessionStorage.setItem("userLoggedUserName", user.username);
        let roles = [];
        if (user.roles) {
          user.roles.map((role) => {
            roles.push(role.name);
          });
        }
        setUserRoles(roles);
        sessionStorage.setItem("userLoggedRoles", roles);
        setUserRealName(user.name.split(" ")[0]);
      })
      .catch((error) => {});
  };

  const logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userLoggedName");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticateUser,
        logOut,
        getUser,
        userRealName,
        userRoles,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
