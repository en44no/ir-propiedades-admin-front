import axios from "axios";
import React, { useState, useEffect } from "react";
import Notification from "../../components/Other/Notification";
import CustomersContext from "./CustomersContext";

const CustomersState = (props) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
    console.log(customers);
  }, []);

  const fetchCustomers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/customers`)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((error) => {});
  };

  const addCustomer = async (data, address) => {
    await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/customers`, data)
      .then((res) =>
        res.status === 201
          ? (Notification(
              "Cliente agregado correctamente",
              "Has agregado un nuevo cliente",
              "success"
            ),
            setCustomers([...customers, res.data]))
          : null
      )
      .catch((err) => {
        Notification(
          "Error al agregar el cliente",
          "Ocurrió un error intentado agregar el cliente",
          "error"
        );
      });
  };

  const editCustomer = async (data, customerId) => {
    await axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/customers/${customerId}`,
        data
      )
      .then((res) => {
        if (res.status === 200) {
          Notification(
            "Cliente editado correctamente",
            "Has editado un cliente",
            "success"
          );
          setCustomers([
            ...customers.filter((customer) => customer._id !== customerId),
            res.data,
          ]);
        }
      })
      .catch((error) => {
        Notification(
          "Error al editar el cliente",
          "Ocurrió un error intentado editar el cliente",
          "error"
        );
      });
  };

  const deleteCustomer = async (data) => {
    await axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/customers/${data._id}`)
      .then((res) =>
        res.status === 200
          ? (Notification(
              "Cliente eliminado correctamente",
              "Has eliminado un cliente",
              "success"
            ),
            setCustomers(
              customers.filter((customer) => customer._id !== res.data._id)
            ))
          : null
      )
      .catch((err) => {
        Notification(
          "Error al eliminar el cliente",
          "Ocurrió un error intentado eliminar el cliente",
          "error"
        );
      });
  };

  return (
    <CustomersContext.Provider
      value={{
        setCustomers,
        customers,
        addCustomer,
        editCustomer,
        deleteCustomer,
      }}
    >
      {props.children}
    </CustomersContext.Provider>
  );
};

export default CustomersState;
