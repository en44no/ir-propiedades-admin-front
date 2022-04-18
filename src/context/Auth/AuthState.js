import axios from "axios";
import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const [userRealName, setUserRealName] = useState("Usuario");
  const [userRoles, setUserRoles] = useState("");

  const authenticateUser = async (data) => {
    await axios
      .post(`http://168.181.187.43:4000/auth/signin`, data)
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
      .get(`http://168.181.187.43:4000/users/`)
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
        sessionStorage.setItem("userLoggedRoles", roles);
        setUserRoles(roles);
        setUserRealName(user.name.split(" ")[0]);
      })
      .catch((error) => {});
  };

  const logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userLoggedName");
    sessionStorage.removeItem("userLoggedUserName");
    sessionStorage.removeItem("userLoggedRoles");
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
