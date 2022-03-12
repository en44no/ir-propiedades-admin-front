import axios from "axios";
import React, { useState, useEffect } from "react";
import Notification from "../../components/Other/Notification";
import PropertiesContext from "./PropertiesContext";

const PropertiesState = (props) => {
  const [properties, setProperties] = useState([]);
  const [addressToAdd, setAddressToAdd] = useState(null);
  const [posts, setPosts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [featuresProperty, setFeaturesProperty] = useState([]);
  const [imagesPendingToAddForPost, setImagesPendingToAddForPost] = useState(
    []
  );

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/properties`)
      .then((res) => {
        setProperties(res.data);
      })
      .catch((error) => {});
  };

  const addProperty = async (data, address) => {
    data.address = address;
    await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/properties`, data)
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
      .put(`${process.env.REACT_APP_API_BASE_URL}/addresses/${addressId}`, data)
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
      .delete(`${process.env.REACT_APP_API_BASE_URL}/properties/${data._id}`)
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
      .post(`${process.env.REACT_APP_API_BASE_URL}/addresses`, data)
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
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/properties/${property._id}`,
        data
      )
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

  const addVirtualTourToProperty = async (virtualTourImages, property) => {
    await axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/properties/${property._id}`, {
        virtualTour: virtualTourImages,
      })
      .then((res) => {
        if (res.status === 200) {
          Notification(
            "Virtual tour modificado correctamente",
            "Has modificado el virtual tour de una propiedad",
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
          "Error al modificar virtual tour",
          "Ocurrió un error intentado modificar el virtual tour de una propiedad",
          "error"
        );
      });
  };

  const addPost = async (data, propertyId) => {
    let nowWithoutHours = new Date(new Date().toDateString());
    let startDateWithoutHours = new Date(data.startDate.toDateString());
    if (startDateWithoutHours <= nowWithoutHours) {
      data.status = "Activa";
    } else if (startDateWithoutHours > nowWithoutHours) {
      data.status = "Pendiente";
    }
    data.property = propertyId;
    await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/posts`, data)
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
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/posts/byPropertyId/${propertyId}`
      )
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {});
  };

  const editPost = async (data, postId, propertyId) => {
    const property = properties.find((property) => property._id === propertyId);
    await axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`, data)
      .then((res) => {
        if (res.status === 200) {
          Notification(
            "Publicación editada correctamente",
            "Has editado una publicación",
            "success"
          );
          let images = [];
          res.data.media.map((media) => {
            if (property.media.indexOf(media)) {
              let realImage = property.media.find(
                (image) => image._id === media
              );
              images.push(realImage);
            }
          });
          res.data.media = images;
          setPosts([...posts.filter((post) => post._id !== postId), res.data]);
          fetchProperties();
        }
      })
      .catch((error) => {
        Notification(
          "Error al editar la publicación",
          "Ocurrió un error intentado editar la publicación",
          "error"
        );
      });
  };

  const deletePost = async (data) => {
    await axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/posts/${data._id}`)
      .then((res) =>
        res.status === 200
          ? (Notification(
              "Publicación eliminada correctamente",
              "Has eliminado una publicación",
              "success"
            ),
            setPosts(posts.filter((post) => post._id !== res.data._id)))
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
    let property = properties.find((property) => property._id === propertyId);
    data.property = propertyId;
    await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/features`, data)
      .then((res) => {
        if (res.status === 201) {
          Notification(
            "Característica agregada correctamente",
            "Has agregado una nueva característica",
            "success"
          );
          const newProperties = properties.map((prop) => {
            if (prop._id === propertyId) {
              return property;
            } else {
              return prop;
            }
          });
          property.features = [...property.features, res.data];
          setProperties(newProperties);
          addFeatureToProperty(res.data, propertyId);
        }
      })
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
      .put(`${process.env.REACT_APP_API_BASE_URL}/features/${featureId}`, data)
      .then((res) => {
        if (res.status === 200) {
          Notification(
            "Característica editada correctamente",
            "Has editado una característica",
            "success"
          );
          property.features = [
            ...property.features.filter((feature) => feature._id !== featureId),
            res.data,
          ];
          const newProperties = properties.map((prop) => {
            if (prop._id === propertyId) {
              return property;
            } else {
              return prop;
            }
          });
          setProperties(newProperties);
          addFeatureToProperty(res.data, propertyId);
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

  const deleteFeature = async (feature, property) => {
    await axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/features/${feature._id}`)
      .then((res) => {
        if (res.status === 200) {
          Notification(
            "Característica eliminada correctamente",
            "Has eliminado una característica",
            "success"
          );
          const newProperties = properties.map((prop) => {
            if (prop._id === property._id) {
              return property;
            } else {
              return prop;
            }
          });
          property.features = property.features.filter(
            (feat) => feat._id !== feature._id
          );
          setProperties(newProperties);
          addFeatureToProperty(res.data, property._id);
        }
      })
      .catch((err) => {
        Notification(
          "Error al eliminar la característica",
          "Ocurrió un error intentado eliminar la característica",
          "error"
        );
      });
  };

  const addFeatureToProperty = async (feature, propertyId) => {
    const property = properties.find((property) => property._id === propertyId);
    const features = property.features.map((feature) => {
      return feature._id;
    });
    await axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/properties/${propertyId}`, {
        features: [...features],
      })
      .then((res) => {
        if (res.status === 200) {
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
      .post(`${process.env.REACT_APP_API_BASE_URL}/features/many`, features)
      .then((res) => {
        setFeaturesProperty(res.data);
      })
      .catch((error) => {});
  };

  const addMedia = async (data, property) => {
    let formData = new FormData();
    formData.append("images", data.image);
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/uploads/${property._id}`,
        formData
      )
      .then(async (res) => {
        data.url = res.data.files[0].url;
        delete data.image;
        await axios
          .post(`${process.env.REACT_APP_API_BASE_URL}/media`, data)
          .then((resMedia) => {
            if (resMedia.status === 201) {
              Notification(
                "Imagen agregada correctamente",
                "Has agregado una nueva imagen",
                "success"
              );
            } else {
              Notification(
                "Error al agregar la imagen",
                "Ocurrió un error intentado agregar la imagen",
                "error"
              );
            }
            const newProperties = properties.map((prop) => {
              if (prop._id === property._id) {
                return property;
              } else {
                return prop;
              }
            });
            property.media = [...property.media, resMedia.data];
            addMediaToProperty(resMedia.data, property);
            setProperties(newProperties);
          })
          .catch((error) => {})
          .catch((error) => {});
      });
  };

  const deleteMedia = async (property, image) => {
    await axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/media/${image._id}`)
      .then((resMedia) => {
        if (resMedia.status === 200) {
          Notification(
            "Imagen eliminada correctamente",
            "Has eliminado una imagen",
            "success"
          );
        } else {
          Notification(
            "Error al eliminar la imagen",
            "Ocurrió un error intentado eliminar la imagen",
            "error"
          );
        }
        const newProperties = properties.map((prop) => {
          if (prop._id === property._id) {
            return property;
          } else {
            return prop;
          }
        });
        property.media = property.media.filter((m) => m._id !== image._id);
        setProperties(newProperties);
        deleteMediaToProperty(property, image);
      })
      .catch((error) => {});
  };

  const addMediaToProperty = async (data, property) => {
    let images = [];
    images.push(data._id);
    await axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/properties/${property._id}/addMedia`,
        images
      )
      .then((resMedia) => {});
  };

  const deleteMediaToProperty = async (property, image) => {
    await axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/properties/${property._id}/removeMedia`,
        { id: image._id }
      )
      .then((resMedia) => {});
  };

  const changeInventoryStatus = async (status, inventoryId) => {
    await axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/inventories/${inventoryId}`, {
        status: [status],
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Notification(
            "Estado del inventario modificado correctamente",
            "Has modicado el estado de un inventario",
            "success"
          );
          fetchProperties();
        } else {
          Notification(
            "Error al modificar el estado del inventario",
            "Ocurrió un error intentado modificar el estado del inventario",
            "error"
          );
        }
      })
      .catch((error) => {});
  };

  const changeReviewStatus = async (status, reviewsId) => {
    await axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/reviews/${reviewsId}`, {
        status: status,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Notification(
            "Estado del control modificado correctamente",
            "Has modicado el estado de un control",
            "success"
          );
          fetchProperties();
        } else {
          Notification(
            "Error al modificar el estado del control",
            "Ocurrió un error intentado modificar el estado del control",
            "error"
          );
        }
      })
      .catch((error) => {});
  };

  const changeOrderMediaFromProperty = async (data, propertyId) => {
    const property = properties.find((property) => property._id === propertyId);
    await axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/properties/${propertyId}`, {
        media: data,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          const newProperties = properties.map((prop) => {
            if (prop._id === property._id) {
              return property;
            } else {
              return prop;
            }
          });
          Notification(
            "Orden de las imágenes modificado correctamente",
            "Has modificado el orden de las imágenes de una propiedad",
            "success"
          );
          setProperties(newProperties);
          fetchProperties();
        } else {
          Notification(
            "Error al modificar el orden de las imágenes",
            "Ocurrió un error intentado modificar el orden de las imágenes de una propiedad",
            "error"
          );
        }
      })
      .catch((error) => {});
  };

  const addSurfaceToProperty = async (surfaceData, propertyId) => {
    debugger;
    const property = properties.find((property) => property._id === propertyId);
    await axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/properties/${propertyId}`, {
        totalSurface: surfaceData.totalSurface,
        buildedSurface: surfaceData.buildedSurface,
        unitMeasurement: surfaceData.unitMeasurement,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Notification(
            "Superficie modificada correctamente",
            "Has modificado la superficie de una propiedad",
            "success"
          );
          const newProperties = properties.map((prop) => {
            if (prop._id === property._id) {
              property.totalSurface = surfaceData.totalSurface;
              property.buildedSurface = surfaceData.buildedSurface;
              property.unitMeasurement = surfaceData.unitMeasurement;
              return property;
            } else {
              return prop;
            }
          });
          setProperties(newProperties);
          fetchProperties();
        } else {
          Notification(
            "Error al modificar la superficie",
            "Ocurrió un error intentado modificar la superficie de una propiedad",
            "error"
          );
        }
      })
      .catch((error) => {});
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
        posts,
        editAddress,
        addresses,
        addFeature,
        featuresProperty,
        getFeaturesByProperty,
        addMedia,
        addDetailsToProperty,
        deleteFeature,
        editFeature,
        editPost,
        deleteMedia,
        changeInventoryStatus,
        addVirtualTourToProperty,
        imagesPendingToAddForPost,
        setImagesPendingToAddForPost,
        changeReviewStatus,
        addSurfaceToProperty,
        changeOrderMediaFromProperty,
      }}
    >
      {props.children}
    </PropertiesContext.Provider>
  );
};

export default PropertiesState;
