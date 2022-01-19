import axios from "axios";
import React, { useState, useEffect } from "react";
import Notification from "../components/Notification";
import PropertiesContext from "./PropertiesContext";

const PropertiesState = (props) => {
  const [properties, setProperties] = useState([]);
  const [address, setAddress] = useState(null);
  const [posts, setPosts] = useState([]);
  const [propertyPosts, setPropertyPosts] = useState([]);

  const fetchProperties = async () => {
    await axios
      .get("http://localhost:4000/properties")
      .then((res) => {
        setProperties(res.data);
      })
      .catch((error) => {});
  };

  const addProperty = async (data, address) => {
    data.address = address;
    await axios
      .post("http://localhost:4000/properties", data)
      .then((res) =>
        res.status === 201
          ? (Notification(
              "Propiedad agregada correctamente",
              "Has agregado una nueva propiedad",
              "success"
            ),
            setAddress(null),
            (res.data.address = address),
            setProperties([...properties, res.data]))
          : null
      )
      .catch((err) => {
        Notification(
          "Error al agregar la propiedad",
          "Ocurrió un error intentado agregar la propiedad",
          "error"
        );
      });
  };

  const deleteProperty = async (data) => {
    await axios
      .delete(`http://localhost:4000/properties/${data._id}`)
      .then((res) =>
        res.status === 201
          ? (Notification(
              "Dirección agregada correctamente",
              "Has agregado una nueva dirección",
              "success"
            ),
            setAddress(null),
            setProperties(
              properties.filter((property) => property._id !== res.data._id)
            ))
          : null
      )
      .catch((err) => {
        Notification(
          "Error al eliminar la propiedad",
          "Ocurrió un error intentado eliminar la propiedad",
          "error"
        );
      });
  };

  const addAddress = async (data) => {
    await axios
      .post("http://localhost:4000/addresses", data)
      .then((res) =>
        res.status === 201
          ? (Notification(
              "Dirección agregada correctamente",
              "Has agregado una nueva dirección",
              "success"
            ),
            setAddress(res.data))
          : null
      )
      .catch((error) => {
        Notification(
          "Error al agregar la dirección",
          "Ocurrió un error intentado agregar la dirección",
          "error"
        );
      });
  };

  const addPost = async (data, propertyId) => {
    data.property = propertyId;
    await axios
      .post("http://localhost:4000/posts", data)
      .then((res) =>
        res.status === 201
          ? (Notification(
              "Publicación creada correctamente",
              "Has creado una nueva publicación",
              "success"
            ),
            setPosts([...posts, res.data]))
          : null
      )
      .catch((error) => {
        Notification(
          "Error al crear la publicación",
          "Ocurrió un error intentado crear la publicación",
          "error"
        );
      });
  };

  const getPostsByProperty = async (propertyId) => {
    await axios
      .get(`http://localhost:4000/posts/byPropertyId/${propertyId}`)
      .then((res) => {
        setPropertyPosts(res.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        setProperties,
        address,
        setAddress,
        addProperty,
        addAddress,
        deleteProperty,
        addPost,
        getPostsByProperty,
        propertyPosts,
      }}
    >
      {props.children}
    </PropertiesContext.Provider>
  );
};

export default PropertiesState;
