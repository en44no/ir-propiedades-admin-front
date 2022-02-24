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

  // const addProperty = async (data, address) => {
  //   data.address = address;
  //   await axios
  //     .post(`${process.env.REACT_APP_API_BASE_URL}/properties`, data)
  //     .then((res) =>
  //       res.status === 201
  //         ? (Notification(
  //             "Propiedad agregada correctamente",
  //             "Has agregado una nueva propiedad",
  //             "success"
  //           ),
  //           (res.data.address = address),
  //           setAddressToAdd(null),
  //           setProperties([...properties, res.data]))
  //         : null
  //     )
  //     .catch((err) => {
  //       Notification(
  //         "Error al agregar la propiedad",
  //         "Ocurrió un error intentado agregar la propiedad",
  //         "error"
  //       );
  //     });
  // };

  return (
    <UsersContext.Provider
      value={{
        users,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersState;
