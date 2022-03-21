import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Notification from "../../components/Other/Notification";
import PropertiesContext from "../Properties/PropertiesContext";
import CustomersContext from "./CustomersContext";

const CustomersState = (props) => {
  const { properties } = useContext(PropertiesContext);
  const [customers, setCustomers] = useState([]);
  const [
    associatedPropertiesPendingToAdd,
    setAssociatedPropertiesPendingToAdd,
  ] = useState([]);

  useEffect(() => {
    fetchCustomers();
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
    let ownerPropertiesObjects = [];
    let tenantPropertiesObjects = [];
    if (
      data.ownerProperties !== null &&
      data.ownerProperties !== undefined &&
      data.ownerProperties.length > 0
    ) {
      let ownerPropertiesIds = [];
      data.ownerProperties.map((property) => {
        const propertyToAdd = properties.find(
          (p) => p.internalCode === property
        );
        if (propertyToAdd) {
          ownerPropertiesIds.push(propertyToAdd._id);
          ownerPropertiesObjects.push(propertyToAdd);
        }
      });
      data.ownerProperties = ownerPropertiesIds;
    }
    if (
      data.tenantProperties !== null &&
      data.tenantProperties !== undefined &&
      data.tenantProperties.length > 0
    ) {
      let tenantPropertiesIds = [];
      data.tenantProperties.map((property) => {
        const propertyToAdd = properties.find(
          (p) => p.internalCode === property
        );
        if (propertyToAdd) {
          tenantPropertiesIds.push(propertyToAdd._id);
          tenantPropertiesObjects.push(propertyToAdd);
        }
      });
      data.tenantProperties = tenantPropertiesIds;
    }
    await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/customers`, data)
      .then((res) =>
        res.status === 201
          ? (Notification(
              "Cliente agregado correctamente",
              "Has agregado un nuevo cliente",
              "success"
            ),
            (res.data.ownerProperties = ownerPropertiesObjects),
            (res.data.tenantProperties = tenantPropertiesObjects),
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
    let ownerPropertiesObjects = [];
    let tenantPropertiesObjects = [];
    if (
      data.ownerProperties !== null &&
      data.ownerProperties !== undefined &&
      data.ownerProperties.length > 0
    ) {
      let ownerPropertiesIds = [];
      data.ownerProperties.map((property) => {
        const propertyToAdd = properties.find(
          (p) => p.internalCode === property
        );
        if (propertyToAdd) {
          ownerPropertiesIds.push(propertyToAdd._id);
          ownerPropertiesObjects.push(propertyToAdd);
        }
      });
      data.ownerProperties = ownerPropertiesIds;
    }
    if (
      data.tenantProperties !== null &&
      data.tenantProperties !== undefined &&
      data.tenantProperties.length > 0
    ) {
      let tenantPropertiesIds = [];
      data.tenantProperties.map((property) => {
        const propertyToAdd = properties.find(
          (p) => p.internalCode === property
        );
        if (propertyToAdd) {
          tenantPropertiesIds.push(propertyToAdd._id);
          tenantPropertiesObjects.push(propertyToAdd);
        }
      });
      data.tenantProperties = tenantPropertiesIds;
    }
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
          res.data.ownerProperties = ownerPropertiesObjects;
          res.data.tenantProperties = tenantPropertiesObjects;
          setCustomers([
            ...customers.filter((customer) => customer._id !== customerId),
            res.data,
          ]);
          fetchCustomers();
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
        fetchCustomers,
        setCustomers,
        customers,
        addCustomer,
        editCustomer,
        deleteCustomer,
        associatedPropertiesPendingToAdd,
        setAssociatedPropertiesPendingToAdd,
      }}
    >
      {props.children}
    </CustomersContext.Provider>
  );
};

export default CustomersState;
