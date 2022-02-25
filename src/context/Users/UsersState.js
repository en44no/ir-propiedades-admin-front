import axios from "axios";
import React, { useState, useEffect } from "react";
import Notification from "../../components/Other/Notification";
import UsersContext from "./UsersContext";

const UsersState = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {});
  };

  const addUser = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/users`, data)
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          Notification(
            "Usuario agregado correctamente",
            "Has agregado un nuevo usuario",
            "success"
          );
          setUsers([...users, res.data]);
        }
      })
      .catch((err) => {
        Notification(
          "Error agregando usuario",
          "Ocurrió un error intentado agregar al usuario",
          "error"
        );
      });
  };

  const editUser = async (data, userId) => {
    if (data.password.trim() === undefined || data.password.trim() === "") {
      delete data.password;
    }
    await axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`, data)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Notification(
            "Usuario editado correctamente",
            "Has editado un usuario",
            "success"
          );
          setUsers([...users.filter((user) => user._id !== userId), res.data]);
        }
      })
      .catch((error) => {
        Notification(
          "Error al editar usuario",
          "Ocurrió un error intentado editar el usuario",
          "error"
        );
      });
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        addUser,
        editUser,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersState;
