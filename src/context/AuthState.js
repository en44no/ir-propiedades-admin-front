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
        } else {
          data.isAuthenticated = false;
        }
      })
      .catch((error) => {});
  };

  const logOut = () => {
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticateUser,
        logOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
