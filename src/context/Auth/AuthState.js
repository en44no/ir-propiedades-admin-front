import axios from "axios";
import React from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const authenticateUser = async (data) => {
    await axios
      .post("http://localhost:4000/auth/signin", data)
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
      .get(`http://localhost:4000/users/`)
      .then((res) => {
        const user = res.data.find((user) => user.username === username);
        sessionStorage.setItem("name", user.name.split(" ")[0]);
      })
      .catch((error) => {});
  };

  const logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticateUser,
        logOut,
        getUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;