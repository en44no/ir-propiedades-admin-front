import axios from "axios";
import React, { useState, useEffect } from "react";
import Notification from "../../components/Other/Notification";
import PropertiesContext from "./PropertiesContext";

const PropertiesState = (props) => {
  const [properties, setProperties] = useState([]);
  const [addressToAdd, setAddressToAdd] = useState(null);
  const [posts, setPosts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [propertyPosts, setPropertyPosts] = useState([]);
  const [features, setFeatures] = useState([]);
  const [featuresProperty, setFeaturesProperty] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

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
            (res.data.address = address),
            setAddressToAdd(null),
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

  const editAddress = async (data, addressId) => {
    let property = properties.find(
      (property) => property.address._id === addressId
    );
    if (!property) {
      return addAddress(data);
    }
    await axios
      .put(`http://localhost:4000/addresses/${addressId}`, data)
      .then((res) => {
        if (res.status === 200) {
          Notification(
            "Dirección editada correctamente",
            "Has editado una dirección",
            "success"
          );
          property.address = res.data;
          setAddresses([...addresses, res.data]);
          const newProperties = properties.map((prop) => {
            if (prop._id === property._id) {
              return property;
            } else {
              return prop;
            }
          });
          setProperties(newProperties);
        }
      })
      .catch((error) => {
        Notification(
          "Error al editar la dirección",
          "Ocurrió un error intentado editar la dirección",
          "error"
        );
      });
  };

  const deleteProperty = async (data) => {
    await axios
      .delete(`http://localhost:4000/properties/${data._id}`)
      .then((res) =>
        res.status === 200
          ? (Notification(
              "Propiedad eliminada correctamente",
              "Has eliminado una propiedad",
              "success"
            ),
            setAddressToAdd(null),
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
            setAddressToAdd(res.data),
            setAddresses([...addresses, res.data]))
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

  const addDetailsToProperty = async (data, property) => {
    await axios
      .put(`http://localhost:4000/properties/${property._id}`, data)
      .then((res) => {
        if (res.status === 200) {
          Notification(
            "Detalles agregados correctamente",
            "Has agregado detalles a una propiedad",
            "success"
          );
          const newProperties = properties.map((prop) => {
            if (prop._id === property._id) {
              return property;
            } else {
              return prop;
            }
          });
          setProperties(newProperties);
        }
      })
      .catch((error) => {
        Notification(
          "Error al agregar detalles a la propiedad",
          "Ocurrió un error intentado agregar detalles a la propiedad",
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
            setPosts([...posts, res.data]),
            getPostsByProperty(propertyId))
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

  const deletePost = async (data) => {
    await axios
      .delete(`http://localhost:4000/posts/${data._id}`)
      .then((res) =>
        res.status === 200
          ? (Notification(
              "Publicación eliminada correctamente",
              "Has eliminado una publicación",
              "success"
            ),
            setPosts(posts.filter((post) => post._id !== res.data._id)),
            setPropertyPosts(
              propertyPosts.filter((post) => post._id !== res.data._id)
            ))
          : null
      )
      .catch((err) => {
        Notification(
          "Error al eliminar la publicación",
          "Ocurrió un error intentado eliminar la publicación",
          "error"
        );
      });
  };

  const addFeature = async (data, propertyId) => {
    data.property = propertyId;
    await axios
      .post("http://localhost:4000/features", data)
      .then((res) =>
        res.status === 201
          ? (Notification(
              "Característica agregada correctamente",
              "Has agregado una nueva característica",
              "success"
            ),
            setFeatures([...features, res.data]),
            addFeatureToProperty(res.data._id, propertyId))
          : null
      )
      .catch((error) => {
        Notification(
          "Error al agregar la característica",
          "Ocurrió un error intentado agregar la característica",
          "error"
        );
      });
  };

  const editFeature = async (data, featureId, propertyId) => {
    let property = properties.find((property) => property._id === propertyId);
    await axios
      .put(`http://localhost:4000/features/${featureId}`, data)
      .then((res) => {
        if (res.status === 200) {
          Notification(
            "Característica editada correctamente",
            "Has editado una característica",
            "success"
          );
          setFeaturesProperty([
            ...featuresProperty.filter((feature) => feature._id !== featureId),
            res.data,
          ]);
          const newProperties = properties.map((prop) => {
            if (prop._id === propertyId) {
              return property;
            } else {
              return prop;
            }
          });
          setProperties(newProperties);
        }
      })
      .catch((error) => {
        Notification(
          "Error al editar la característica",
          "Ocurrió un error intentado editar la característica",
          "error"
        );
      });
  };

  const deleteFeature = async (data) => {
    await axios
      .delete(`http://localhost:4000/features/${data._id}`)
      .then((res) =>
        res.status === 200
          ? (Notification(
              "Característica eliminada correctamente",
              "Has eliminado una característica",
              "success"
            ),
            setFeatures(
              features.filter((feature) => feature._id !== res.data._id)
            ),
            setFeaturesProperty(
              featuresProperty.filter((feature) => feature._id !== res.data._id)
            ))
          : null
      )
      .catch((err) => {
        Notification(
          "Error al eliminar la característica",
          "Ocurrió un error intentado eliminar la característica",
          "error"
        );
      });
  };

  const addFeatureToProperty = async (featureId, propertyId) => {
    const property = properties.find((property) => property._id === propertyId);
    await axios
      .put(`http://localhost:4000/properties/${propertyId}`, {
        features: [...property.features, featureId],
      })
      .then((res) => {
        if (res.status === 200) {
          property.address = res.data;
          const newProperties = properties.map((prop) => {
            if (prop._id === property._id) {
              return property;
            } else {
              return prop;
            }
          });
          setProperties(newProperties);
        }
      })
      .catch((error) => {});
  };

  const getFeaturesByProperty = async (propertyId) => {
    const property = properties.find((property) => property._id === propertyId);
    const features = property.features;
    await axios
      .post("http://localhost:4000/features/many", features)
      .then((res) => {
        setFeaturesProperty(res.data);
      })
      .catch((error) => {});
  };

  const addMedia = async (data, property) => {
    let images = [];
    images.push(data.image);
    console.log(images);
    await axios
      .post("http://localhost:4000/uploads", images)
      .then(async (res) => {
        let url = "http://localhost:4000/static/" + res.filename;
        data.url = url;
        await axios
          .post("http://localhost:4000/media", data)
          .then((res) => {
            property.media = res.data;
            const newProperties = properties.map((prop) => {
              if (prop._id === property._id) {
                return property;
              } else {
                return prop;
              }
            });
            setProperties(newProperties);
            if (res.status === 201) {
              Notification(
                "Imagen agregada correctamente",
                "Has agregado una nueva imagen",
                "success"
              );
            }
          })
          .catch((error) => {
            Notification(
              "Error al agregar la imagen",
              "Ocurrió un error intentado agregar la imagen",
              "error"
            );
          })
          .catch((error) => {});
      });
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        setProperties,
        addressToAdd,
        setAddressToAdd,
        addProperty,
        addAddress,
        deleteProperty,
        deletePost,
        addPost,
        getPostsByProperty,
        propertyPosts,
        editAddress,
        addresses,
        addFeature,
        featuresProperty,
        getFeaturesByProperty,
        addMedia,
        addDetailsToProperty,
        deleteFeature,
        editFeature,
      }}
    >
      {props.children}
    </PropertiesContext.Provider>
  );
};

export default PropertiesState;
