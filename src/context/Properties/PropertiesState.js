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
    {}
  );
  const [propertiesAreLoading, setPropertiesAreLoading] = useState(true);
  const [postsAreLoading, setPostsAreLoading] = useState(true);
  const [imagesAreLoading, setImagesAreLoading] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {}, []);

  const fetchProperties = async () => {
    setPropertiesAreLoading(true);
    await axios
      .get(`http://66.97.43.140:4000/properties`)
      .then((res) => {
        setProperties(res.data);
        setPropertiesAreLoading(false);
      })
      .catch((error) => {});
  };

  const addProperty = async (data, address) => {
    data.address = address;
    await axios
      .post(`http://66.97.43.140:4000/properties`, data)
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
      .put(`http://66.97.43.140:4000/addresses/${addressId}`, data)
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
              return { ...property, address: res.data };
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
      .delete(`http://66.97.43.140:4000/properties/${data._id}`)
      .then((res) =>
        res.status === 200
          ? (Notification(
              "Propiedad eliminada correctamente",
              "Has eliminado una propiedad",
              "success"
            ),
            setAddressToAdd(null),
            setProperties(
              properties.filter((property) => property._id !== data._id)
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
      .post(`http://66.97.43.140:4000/addresses`, data)
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

  const addDetailsToProperty = async (data, property, withoutNotification) => {
    await axios
      .put(
        `http://66.97.43.140:4000/properties/${property._id}`,
        data
      )
      .then((res) => {
        if (res.status === 200) {
          if (!withoutNotification) {
            Notification(
              "Detalles agregados correctamente",
              "Has agregado detalles a una propiedad",
              "success"
            );
          }
          data.type != null && (property.type[0] = data.type);
          data.media != null && (property.media = data.media);
          data.virtualTour != null && (property.virtualTour = data.virtualTour);
          data.isForRent != null && (property.isForRent = data.isForRent);
          data.isForSale != null && (property.isForSale = data.isForSale);
          data.saleDate != null
            ? (property.saleDate = data.saleDate)
            : (property.saleDate = null);
          data.rentDate != null
            ? (property.rentDate = data.rentDate)
            : (property.rentDate = null);
          data.name != null && (property.name = data.name);
          data.comment != null && (property.comment = data.comment);
          data.description != null && (property.description = data.description);
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
      .put(`http://66.97.43.140:4000/properties/${property._id}`, {
        virtualTour: virtualTourImages,
      })
      .then((res) => {
        if (res.status === 200) {
          Notification(
            "Virtual tour modificado correctamente",
            "Has modificado el virtual tour de una propiedad",
            "success"
          );
          property.virtualTour = virtualTourImages;
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
    if (data.mercadoLibre == false) {
      await axios
        .post(`http://66.97.43.140:4000/posts`, data)
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
    } else {
      if (data.isForSale == true) {
        await axios
          .post(`http://66.97.43.140:4000/posts`, data)
          .then((res) =>
            res.status === 201
              ? (Notification(
                  "Publicación de venta creada correctamente",
                  "Has creado una nueva publicación de venta",
                  "success",
                  7000
                ),
                setPosts([...posts, res.data]),
                data.mercadoLibre == true &&
                  postInMercadolibre(res.data, "venta"))
              : null
          )
          .catch((error) => {
            if (error.status == 500 || error.status == 400) {
              Notification(
                "Error al crear la publicación de venta",
                "Ocurrió un error intentado crear la publicación de venta",
                "error",
                7000
              );
            }
          });
      }
      if (data.isForRent == true) {
        await axios
          .post(`http://66.97.43.140:4000/posts`, data)
          .then((res) =>
            res.status === 201
              ? (Notification(
                  "Publicación de alquiler creada correctamente",
                  "Has creado una nueva publicación de alquiler",
                  "success",
                  7000
                ),
                setPosts([...posts, res.data]),
                data.mercadoLibre == true &&
                  postInMercadolibre(res.data, "alquiler"))
              : null
          )
          .catch((error) => {
            if (error.status == 500 || error.status == 400) {
              Notification(
                "Error al crear la publicación de alquiler",
                "Ocurrió un error intentado crear la publicación de alquiler",
                "error",
                7000
              );
            }
          });
      }
    }
  };

  const postInMercadolibre = async (post, type) => {
    let property = properties.find(
      (property) => property._id === post.property
    );
    if (type == "venta") {
      const postToSend = {
        title: post.title,
        category_id: "MLU1468",
        price: post.forSalePrice,
        currency_id: "USD",
        available_quantity: 1,
        buying_mode: "classified",
        listing_type_id: "silver",
        condition: "new",
        start_time: post.startDate,
        pictures: post.media.map((media) => ({
          source: media.url,
        })),
        seller_contact: {
          contact: "Ian Rodríguez Propiedades",
          area_code: "011",
          phone: "11 66 42 34 62",
          email: "info@ianrodriguezprop.com",
        },
        location: {
          address_line:
            property.address.street +
            ", " +
            property.address.city +
            ", " +
            property.address.state +
            ", " +
            property.address.country +
            ", ",
          zip_code: null,
          neighborhood: {
            id: "TUxBQlBBUzgyNjBa",
          },
          latitude: null,
          longitude: null,
        },
        attributes: [
          {
            id: "FULL_BATHROOMS",
            value_name: property.features.filter(
              (feature) => feature.type[0] === "Baño"
            ).length,
          },
          {
            id: "PARKING_LOTS",
            value_name: property.features.filter(
              (feature) => feature.type[0] === "Garaje"
            ).length,
          },
          {
            id: "ROOMS",
            value_name: 0,
          },
          {
            id: "BEDROOMS",
            value_name: property.features.filter(
              (feature) => feature.type[0] === "Dormitorio"
            ).length,
          },
          {
            id: "COVERED_AREA",
            value_name:
              property.buildedSurface + " " + property.unitMeasurement,
          },
          {
            id: "TOTAL_AREA",
            value_name: property.totalSurface + " " + property.unitMeasurement,
          },
        ],
      };
      await axios
        .post(`http://66.97.43.140:4000/mercadolibre`, postToSend)
        .then((res) => {
          if (res.status == 201) {
            Notification(
              "Publicación en MercadoLibre para venta creada correctamente",
              "Deberás efectuar el pago en MercadoLibre para que la publicación sea visible.",
              "success",
              7000
            );
            addMercadoLibreLinkToPost(post, res.data.permalink);
          }
        })
        .catch((error) => {
          if (error.status == 500 || error.status == 400) {
            Notification(
              "Error al crear la publicación para venta en MercadoLibre",
              "Ocurrió un error intentado crear la publicación en MercadoLibre",
              "error",
              7000
            );
          }
        });
    }
    if (type === "alquiler") {
      const postToSend = {
        title: post.title,
        category_id: "MLU1467",
        price: post.forRentPrice,
        currency_id: "USD",
        available_quantity: 1,
        buying_mode: "classified",
        listing_type_id: "silver",
        condition: "new",
        start_time: post.startDate,
        pictures: post.media.map((media) => ({
          source: media.url,
        })),
        seller_contact: {
          contact: "Ian Rodríguez Propiedades",
          area_code: "011",
          phone: "11 66 42 34 62",
          email: "info@ianrodriguezprop.com",
        },
        location: {
          address_line:
            property.address.street +
            ", " +
            property.address.city +
            ", " +
            property.address.state +
            ", " +
            property.address.country +
            ", ",
          zip_code: null,
          neighborhood: {
            id: "TUxBQlBBUzgyNjBa",
          },
          latitude: null,
          longitude: null,
        },
        attributes: [
          {
            id: "FULL_BATHROOMS",
            value_name: property.features.filter(
              (feature) => feature.type[0] === "Baño"
            ).length,
          },
          {
            id: "PARKING_LOTS",
            value_name: property.features.filter(
              (feature) => feature.type[0] === "Garaje"
            ).length,
          },
          {
            id: "ROOMS",
            value_name: 0,
          },
          {
            id: "BEDROOMS",
            value_name: property.features.filter(
              (feature) => feature.type[0] === "Dormitorio"
            ).length,
          },
          {
            id: "COVERED_AREA",
            value_name:
              property.buildedSurface + " " + property.unitMeasurement,
          },
          {
            id: "TOTAL_AREA",
            value_name: property.totalSurface + " " + property.unitMeasurement,
          },
        ],
      };
      await axios
        .post(`http://66.97.43.140:4000/mercadolibre`, postToSend)
        .then((res) => {
          if (res.status === 201) {
            Notification(
              "Publicación en MercadoLibre para alquiler creada correctamente",
              "Deberás efectuar el pago en MercadoLibre para que la publicación sea visible.",
              "success",
              7000
            );
            addMercadoLibreLinkToPost(post, res.data.permalink);
          }
        })
        .catch((error) => {
          if (error.status == 500 || error.status == 400) {
            Notification(
              "Error al crear la publicación para alquiler en MercadoLibre",
              "Ocurrió un error intentado crear la publicación en MercadoLibre",
              "error",
              7000
            );
          }
        });
    }
  };

  const getPostsByProperty = async (propertyId) => {
    setPostsAreLoading(true);
    await axios
      .get(
        `http://66.97.43.140:4000/posts/byPropertyId/${propertyId}`
      )
      .then((res) => {
        setPosts(res.data);
        setPostsAreLoading(false);
      })
      .catch((error) => {});
  };

  const editPost = async (data, postId, propertyId) => {
    const property = properties.find((property) => property._id === propertyId);
    await axios
      .put(`http://66.97.43.140:4000/posts/${postId}`, data)
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
          if (res.data.status == "Finalizada" || res.data.status == "Pausada") {
            getPostsByProperty(propertyId);
          }
        }
      })
      .catch((error) => {
        if (error.status == 500 || error.status == 400) {
          Notification(
            "Error al editar la publicación",
            "Ocurrió un error intentado editar la publicación",
            "error"
          );
        }
      });
  };

  const deletePost = async (data) => {
    await axios
      .delete(`http://66.97.43.140:4000/posts/${data._id}`)
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
      .post(`http://66.97.43.140:4000/features`, data)
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
      .put(`http://66.97.43.140:4000/features/${featureId}`, data)
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

  const changePostIsFeature = async (post, newState) => {
    await axios
      .put(`http://66.97.43.140:4000/posts/${post._id}`, {
        isFeatured: newState,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Notification(
            newState == true
              ? "Publicación marcada como destacada correctamente"
              : "Publicación quitada de favoritos correctamente",
            newState == true
              ? "Has marcado esta publicación como destacada"
              : "Has quitado esta publicación de destacados",
            "success"
          );
          post.isFeatured = newState;
          setPosts([
            ...posts.filter((post) => post._id !== res.data._id),
            post,
          ]);
        } else {
          Notification(
            "Error al marcar la publicación como destacada",
            "Ocurrió un error intentado marcar la publicación como destacada",
            "error"
          );
        }
      })
      .catch((error) => {});
  };

  const addMercadoLibreLinkToPost = async (post, link) => {
    await axios
      .put(`http://66.97.43.140:4000/posts/${post._id}`, {
        mercadoLibreLink: link,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          post.mercadoLibreLink = link;
          setPosts([...posts, post]);
        } else {
        }
      })
      .catch((error) => {});
  };

  const deleteFeature = async (feature, property) => {
    await axios
      .delete(`http://66.97.43.140:4000/features/${feature._id}`)
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
      .put(`http://66.97.43.140:4000/properties/${propertyId}`, {
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
      .post(`http://66.97.43.140:4000/features/many`, features)
      .then((res) => {
        setFeaturesProperty(res.data);
      })
      .catch((error) => {});
  };

  const addMedia = async (data, property) => {
    setImagesAreLoading(true);
    let formData = new FormData();
    formData.append("images", data.image);
    await axios
      .post(
        `http://66.97.43.140:4000/uploads/${property._id}`,
        formData
      )
      .then(async (res) => {
        data.url = res.data.files[0].url;
        delete data.image;
        await axios
          .post(`http://66.97.43.140:4000/media`, data)
          .then((resMedia) => {
            if (resMedia.status === 201 || res.status === 200) {
              Notification(
                "Imagen agregada correctamente",
                "Has agregado una nueva imagen",
                "success"
              );
               property.media = [...property.media, resMedia.data];
               addMediaToProperty(resMedia.data, property);
               setProperties(newProperties);
                const newProperties = properties.map((prop) => {
                  if (prop._id === property._id) {
                    return property;
                  } else {
                    return prop;
                  }
                });
            } else {
              Notification(
                "Error al agregar la imagen",
                "Ocurrió un error intentado agregar la imagen",
                "error"
              );
              setImagesAreLoading(false);
            }
          })
          .catch((error) => {})
          .catch((error) => {});
      });
  };

  const deleteMedia = async (property, image) => {
    await axios
      .delete(`http://66.97.43.140:4000/media/${image._id}`)
      .then((resMedia) => {
        if (resMedia.status === 200) {
          Notification(
            "Imagen eliminada correctamente",
            "Has eliminado una imagen",
            "success"
          );
          const newPosts = posts.map((post) => {
            if (
              post.property === property._id ||
              post.property._id === property._id
            ) {
              if (post.status[0] == "Activa") {
                post.media = post.media.filter((m) => m._id !== image._id);
                if (post.media.length === 0) {
                  deletePost(post);
                } else {
                  editPost(post, post._id, property._id);
                }
              }
            }
          });
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
        } else {
          Notification(
            "Error al eliminar la imagen",
            "Ocurrió un error intentado eliminar la imagen",
            "error"
          );
        }
      })
      .catch((error) => {});
  };

  const addMediaToProperty = async (data, property) => {
    let images = [];
    images.push(data._id);
    await axios
      .put(
        `http://66.97.43.140:4000/properties/${property._id}/addMedia`,
        images
      )
      .then((resMedia) => {
        setImagesAreLoading(false);
      });
  };

  const deleteMediaToProperty = async (property, image) => {
    await axios
      .put(
        `http://66.97.43.140:4000/properties/${property._id}/removeMedia`,
        { id: image._id }
      )
      .then((resMedia) => {
        if (resMedia.data.virtualTour.find((tour) => tour === image._id)) {
          const newProperties = properties.map((prop) => {
            if (prop._id === property._id) {
              return property;
            } else {
              return prop;
            }
          });
          property.media = property.media.filter((m) => m._id !== image._id);
          property.virtualTour = property.virtualTour.filter(
            (m) => m._id !== image._id
          );
          addDetailsToProperty(property, property, true);
          setProperties(newProperties);
        }
      });
  };

  const changeInventoryStatus = async (status, inventoryId, propertyId) => {
    const property = properties.find((property) => property._id === propertyId);
    await axios
      .put(`http://66.97.43.140:4000/inventories/${inventoryId}`, {
        status: [status],
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Notification(
            "Estado del inventario modificado correctamente",
            "Has modicado el estado de un inventario",
            "success"
          );
          const newProperties = properties.map((prop) => {
            if (prop._id === property._id) {
              return property;
            } else {
              return prop;
            }
          });
          let inventory = property.inventories.find(
            (inventory) => inventory._id === inventoryId
          );
          inventory.status = [status];
          property.inventories = [
            ...property.inventories.filter(
              (inventory) => inventory._id !== inventoryId
            ),
            inventory,
          ];
          setProperties(newProperties);
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

  const changeReviewStatus = async (
    status,
    reviewsId,
    propertyId,
    inventoryId
  ) => {
    const property = properties.find((property) => property._id === propertyId);
    await axios
      .put(`http://66.97.43.140:4000/reviews/${reviewsId}`, {
        status: status,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Notification(
            "Estado del control modificado correctamente",
            "Has modicado el estado de un control",
            "success"
          );
          const newProperties = properties.map((prop) => {
            if (prop._id === property._id) {
              return property;
            } else {
              return prop;
            }
          });
          let inventory = property.inventories.find(
            (inventory) => inventory._id === inventoryId
          );
          let inventories = property.inventories;
          let review = "";
          inventories.forEach((inventory) => {
            review = inventory.reviews.find(
              (review) => review._id === reviewsId
            );
          });
          review.status = status;
          inventory.reviews = [
            ...inventory.reviews.filter((review) => review._id !== reviewsId),
            review,
          ];
          property.inventories = [
            ...property.inventories.filter((inv) => inv._id !== inventory),
            inventory,
          ];
          setProperties(newProperties);
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
      .put(`http://66.97.43.140:4000/properties/${propertyId}`, {
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
    const property = properties.find((property) => property._id === propertyId);
    await axios
      .put(`http://66.97.43.140:4000/properties/${propertyId}`, {
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

  const addDocumentToProperty = async (documentId, property) => {
    let documents;
    if (property.documents.length > 0) {
      documents = property.documents.map((document) => {
        return document._id;
      });
    }
    await axios
      .put(`http://66.97.43.140:4000/properties/${property._id}`, {
        documents:
          property.documents.length > 0
            ? [...documents, documentId]
            : [documentId],
      })
      .catch((error) => {});
  };

  const removeDocumentFromProperty = async (documentId, property) => {
    await axios
      .put(`http://66.97.43.140:4000/properties/${property._id}`, {
        documents: [
          ...property.documents.filter(
            (document) => document._id !== documentId
          ),
        ],
      })
      .catch((error) => {});
  };

  const addDocument = async (data, propertyId) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("documents", data.files);
    let property = properties.find((property) => property._id === propertyId);
    await axios
      .post(`http://66.97.43.140:4000/documents`, formData)
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          Notification(
            "Documento agregado correctamente",
            "Has agregado un nuevo documento",
            "success"
          );
          const newProperties = properties.map((prop) => {
            if (prop._id === propertyId) {
              return property;
            } else {
              return prop;
            }
          });
          addDocumentToProperty(res.data[0]._id, property);
          property.documents = [...property.documents, res.data[0]];
          setProperties(newProperties);
        }
      })
      .catch((error) => {
        Notification(
          "Error al agregar el documento",
          "Ocurrió un error intentado agregar el documento",
          "error"
        );
      });
  };

  const editDocument = async (data, documentId, propertyId) => {
    let property = properties.find((property) => property._id === propertyId);
    await axios
      .put(
        `http://66.97.43.140:4000/documents/${documentId}`,
        data
      )
      .then((res) => {
        if (res.status === 200) {
          Notification(
            "Documento editado correctamente",
            "Has editado un documento",
            "success"
          );
          property.documents = [
            ...property.documents.filter(
              (document) => document._id !== documentId
            ),
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
        }
      })
      .catch((error) => {
        Notification(
          "Error al editar el documento",
          "Ocurrió un error intentado editar el documento",
          "error"
        );
      });
  };

  const deleteDocument = async (documentId, property) => {
    await axios
      .delete(`http://66.97.43.140:4000/documents/${documentId}`)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Notification(
            "Documento eliminado correctamente",
            "Has eliminado un documento",
            "success"
          );
          const newProperties = properties.map((prop) => {
            if (prop._id === property._id) {
              return property;
            } else {
              return prop;
            }
          });
          property.documents = property.documents.filter(
            (doc) => doc._id !== documentId
          );
          setProperties(newProperties);
          removeDocumentFromProperty(documentId, property);
        }
      })
      .catch((err) => {
        Notification(
          "Error al eliminar el documento",
          "Ocurrió un error intentado eliminar el documento",
          "error"
        );
      });
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        fetchProperties,
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
        addDocument,
        editDocument,
        deleteDocument,
        changePostIsFeature,
        propertiesAreLoading,
        postsAreLoading,
        imagesAreLoading,
      }}
    >
      {props.children}
    </PropertiesContext.Provider>
  );
};

export default PropertiesState;
