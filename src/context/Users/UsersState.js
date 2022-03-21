import axios from "axios";
import React, { useState, useEffect } from "react";
import Notification from "../../components/Other/Notification";
import UsersContext from "./UsersContext";

const UsersState = (props) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
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
    if (data.roles === false) {
      data.roles = [];
    }
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
          fetchUsers();
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
    if (data.roles === false) {
      data.roles = [];
    }
    if (data.editPassword === false) {
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
          if (data.username == sessionStorage.getItem("userLoggedUserName")) {
            Notification(
              "El usuario que editaste es el mismo que estás usando",
              "Para ver reflejados los cambios deberás volver a iniciar sesión",
              "warning",
              7000
            );
          }
          setUsers([...users.filter((user) => user._id !== userId), res.data]);
          fetchUsers();
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

  const deleteUser = async (userId) => {
    await axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Notification(
            "Usuario eliminado correctamente",
            "Has eliminado un usuario",
            "success"
          );
          setUsers(users.filter((user) => user._id !== res.data._id));
        }
      })
      .catch((err) => {
        Notification(
          "Error al eliminar el usuario",
          "Ocurrió un error intentado eliminar el usuario",
          "error"
        );
      });
  };

  const fetchRoles = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/roles`)
      .then((res) => {
        setRoles(res.data);
      })
      .catch((error) => {});
  };

  return (
    <UsersContext.Provider
      value={{
        fetchUsers,
        users,
        addUser,
        editUser,
        deleteUser,
        roles,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersState;
