import axios from "axios";
import React, { useState, useEffect } from "react";
import Notification from "../../components/Other/Notification";
import UsersContext from "./UsersContext";

const UsersState = (props) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [usersAreLoading, setUsersAreLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    setUsersAreLoading(true);
    await axios
      .get(`http://66.97.43.140:4000/users`)
      .then((res) => {
        setUsers(res.data);
        setUsersAreLoading(false);
      })
      .catch((error) => {});
  };

  const addUser = async (data) => {
    if (data.roles === false) {
      data.roles = [];
    }
    await axios
      .post(`http://66.97.43.140:4000/users`, data)
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
      .put(`http://66.97.43.140:4000/users/${userId}`, data)
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
      .delete(`http://66.97.43.140:4000/users/${userId}`)
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
      .get(`http://66.97.43.140:4000/roles`)
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
        usersAreLoading,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersState;
