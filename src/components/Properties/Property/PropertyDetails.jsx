import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoLogoUsd } from "react-icons/io";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import FeatureList from "../Features/FeatureList";
import EditAddress from "../Address/EditAddress";
import CreateAddress from "../Address/CreateAddress";
import PostList from "../Posts/PostList";
import MediaList from "../Media/MediaList";
import InventoriesList from "../Inventories/InventoriesList";
import CopyInternalCode from "../CopyInternalCode";
import ConfirmDelete from "../../Other/ConfirmDelete";
import VirtualToursList from "../VirtualTours/VirtualToursList";
import ManageSurface from "../Surface/ManageSurface";
import DocumentList from "../Documents/DocumentList";
import Notification from "../../Other/Notification";

const PropertyDetails = (props) => {
  const { deleteProperty, addDetailsToProperty } =
    useContext(PropertiesContext);
  const { property } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [propertyForDetails, setPropertyForDetails] = useState(property);

  useEffect(() => {
    setPropertyForDetails(property);
  }, [property]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleDeleteProperty = () => {
    deleteProperty(property);
    onClose();
  };

  const handlePropertyIsFeatured = (isFeatured) => {
    let data = {};
    if (isFeatured == false) {
      data.isFeatured = false;
      addDetailsToProperty(
        data,
        property,
        "Propiedad quitada de destacados",
        "Has quitado esta propiedad de destacados, no es necesario que confirmes los cambios"
      );
      setPropertyForDetails({
        ...propertyForDetails,
        isFeatured: false,
      });
      property.isFeatured = false;
    } else {
      data.isFeatured = true;
      addDetailsToProperty(
        data,
        property,
        "Propiedad marcada como destacada",
        "Has marcado esta propiedad como destacada, no es necesario que confirmes los cambios"
      );
      setPropertyForDetails({
        ...propertyForDetails,
        isFeatured: true,
      });
      property.isFeatured = true;
    }
  };

  const submitPropertyDetails = (data) => {
    let today = new Date();
    if (data.saleDate === true) {
      data.saleDate = today;
      data.isForSale = false;
    } else {
      data.saleDate = null;
    }
    if (data.rentDate === true) {
      data.rentDate = today;
      data.isForRent = false;
    } else {
      data.rentDate = null;
    }
    addDetailsToProperty(data, property);
    reset();
    onClose();
  };

  const notifySaleOrRent = (e, text, text2) => {
    if (e.target.checked) {
      Notification(
        `Propiedad marcada como ${text}`,
        `Ten en cuenta que si marcas esta propiedad como ${text} deberás revisar sus publicaciones asociadas. Si estás seguro haz click en "Confirmar" para guardar los cambios.`,
        "warning",
        10000
      );
    } else {
      Notification(
        `Propiedad desmarcada como ${text}`,
        `Si desmarcas esta propiedad como ${text} podrás hacer que esté disponible para ${text2}. Si estás seguro haz click en "Confirmar" para guardar los cambios.`,
        "warning",
        10000
      );
    }
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };

  return (
    <>
      <Button
        position="absolute"
        p="0"
        minW="1.7rem"
        minH="1.7rem"
        h="1.7rem"
        w="1.7rem"
        right="1.5"
        top="1.5"
        onClick={onOpen}
        bg="defaultColor.400"
        _hover={{ bg: "defaultColor.500" }}
        borderRadius="50%"
        color="white"
        zIndex={100}
      >
        <Box fontSize="1rem">
          <BsFillInfoCircleFill />
        </Box>
      </Button>
      <Drawer size="xl" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          borderLeft="1px white solid"
          bg="defaultColor.400"
          borderStartStartRadius="7px"
          borderEndStartRadius="7px"
        >
          <DrawerCloseButton
            _focus={{ boxShadow: "none" }}
            color="#fff"
            mt="2"
          />
          <DrawerHeader color="#fff" borderBottomWidth="1px">
            <Box display="flex">
              Detalles de la propiedad{" "}
              <CopyInternalCode
                text="propiedad"
                internalCode={
                  property.internalCode ? property.internalCode : "CÓDIGO"
                }
              />
            </Box>
          </DrawerHeader>
          <DrawerBody color="#fff" pb="1rem">
            <form>
              <SimpleGrid columns={2} spacing={4} spacingX={10}>
                <Box display="flex" mt="1rem">
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="detailsSellSwitch" mb="0">
                      Propiedad vendida
                    </FormLabel>
                    <Switch
                      defaultChecked={
                        property.saleDate && property.saleDate !== null
                          ? true
                          : false
                      }
                      {...register("saleDate")}
                      onChange={(e) => notifySaleOrRent(e, "vendida", "venta")}
                      id="detailsSaleDateSwitch"
                    />
                  </FormControl>
                  <Box>
                    <FormLabel
                      margin="0"
                      w="max-content"
                      htmlFor="detailsSellPrice"
                    >
                      Fecha de venta
                    </FormLabel>
                    <Text textAlign="right" mr="0.1rem">
                      {property.saleDate
                        ? formatDate(property.saleDate)
                        : "Sin vender"}
                    </Text>
                  </Box>
                </Box>
                <Box display="flex" mt="1rem">
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="detailsSellSwitch" mb="0">
                      Propiedad alquilada
                    </FormLabel>
                    <Switch
                      defaultChecked={
                        property.rentDate && property.rentDate !== null
                          ? true
                          : false
                      }
                      {...register("rentDate")}
                      onChange={(e) =>
                        notifySaleOrRent(e, "alquilada", "alquiler")
                      }
                      id="detailsSellSwitch"
                    />
                  </FormControl>
                  <Box>
                    <FormLabel
                      margin="0"
                      w="max-content"
                      htmlFor="detailsSellPrice"
                    >
                      Fecha de alquiler
                    </FormLabel>
                    <Text textAlign="right" mr="0.1rem">
                      {property.rentDate
                        ? formatDate(property.rentDate)
                        : "Sin alquilar"}
                    </Text>
                  </Box>
                </Box>
                {property.saleDate ? (
                  <Text
                    display="flex"
                    fontWeight="500"
                    mt="2rem"
                    alignSelf="center"
                    mb="1rem"
                  >
                    Esta propiedad no está disponible para vender
                  </Text>
                ) : (
                  <Box display="flex" mb="4">
                    <FormControl display="flex" mt="2rem" alignItems="center">
                      <FormLabel htmlFor="detailsSellSwitch" mb="0">
                        Disponible para vender
                      </FormLabel>
                      <Switch
                        defaultChecked={property.isForSale}
                        {...register("isForSale")}
                        id="detailsSellSwitch"
                      />
                    </FormControl>

                    <Box>
                      <FormLabel
                        ml="-2rem"
                        textAlign="center"
                        htmlFor="detailsSellPrice"
                      >
                        Tasación venta
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<IoLogoUsd color="#cacaca" />}
                        />
                        <Input
                          {...register("appraisedSalePrice")}
                          id="detailsSellPrice"
                          type="number"
                          value={propertyForDetails.appraisedSalePrice}
                          onChange={(e) =>
                            setPropertyForDetails({
                              ...propertyForDetails,
                              appraisedSalePrice: e.target.value || 0,
                            })
                          }
                        ></Input>
                      </InputGroup>
                    </Box>
                  </Box>
                )}
                {property.rentDate ? (
                  <Text
                    display="flex"
                    fontWeight="500"
                    mt="2rem"
                    alignSelf="center"
                    mb="1rem"
                  >
                    Esta propiedad no está disponible para alquilar
                  </Text>
                ) : (
                  <Box display="flex" mb="4">
                    <FormControl display="flex" mt="2rem" alignItems="center">
                      <FormLabel htmlFor="detailsRentSwitch" mb="0">
                        Disponible para alquilar
                      </FormLabel>
                      <Switch
                        defaultChecked={property.isForRent}
                        {...register("isForRent")}
                        id="detailsRentSwitch"
                      />
                    </FormControl>
                    <Box>
                      <FormLabel
                        ml="-1.3rem"
                        textAlign="center"
                        htmlFor="detailsRentPrice"
                      >
                        Tasación alquiler
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<IoLogoUsd color="#cacaca" />}
                        />
                        <Input
                          {...register("appraisedRentPrice")}
                          id="detailsRentPrice"
                          type="number"
                          value={propertyForDetails.appraisedRentPrice}
                          onChange={(e) =>
                            setPropertyForDetails({
                              ...propertyForDetails,
                              appraisedRentPrice: e.target.value || 0,
                            })
                          }
                        ></Input>
                      </InputGroup>
                    </Box>
                  </Box>
                )}
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={10}>
                <Stack spacing="14px" id="leftColumn">
                  <Box>
                    <FormLabel htmlFor="propertyName">Nombre</FormLabel>
                    <Input
                      {...register("name")}
                      id="propertyName"
                      placeholder="Ingresa el nombre"
                      value={propertyForDetails.name}
                      onChange={(e) =>
                        setPropertyForDetails({
                          ...propertyForDetails,
                          name: e.target.value,
                        })
                      }
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertySurface">Superficie</FormLabel>
                    <Box>
                      <ManageSurface property={property} full="yes" />
                    </Box>
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyFeatures">
                      Características
                    </FormLabel>
                    <Box>
                      <FeatureList property={property} full="yes" />
                    </Box>
                  </Box>
                  <Box>
                    <Box>
                      <FormLabel htmlFor="propertyDocuments">
                        Documentos
                      </FormLabel>
                      <DocumentList width="100%" property={property} />
                    </Box>
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyVirtualTour">
                      Tour virtual
                    </FormLabel>
                    <VirtualToursList full="yes" property={property} />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyDescription">
                      Descripción
                    </FormLabel>
                    <Textarea
                      rows="7"
                      {...register("description")}
                      id="propertyDescription"
                      placeholder="Ingresa la descripción"
                      value={propertyForDetails.description}
                      onChange={(e) =>
                        setPropertyForDetails({
                          ...propertyForDetails,
                          description: e.target.value,
                        })
                      }
                    />
                  </Box>
                </Stack>
                <Stack spacing="14px" id="rightColumn">
                  <Box>
                    <FormLabel htmlFor="propertyTypes">Tipo</FormLabel>
                    <Select
                      {...register("type", { required: "Tipo es requerido." })}
                      id="propertyType"
                      value={propertyForDetails.type}
                      onChange={(e) =>
                        setPropertyForDetails({
                          ...propertyForDetails,
                          type: e.target.value,
                        })
                      }
                      placeholder="Ingresa el tipo"
                    >
                      <option value="Casa">Casa</option>
                      <option value="Depósito">Depósito</option>
                      <option value="Apartamento">Apartamento</option>
                    </Select>
                    {errors.type && (
                      <Badge variant="required-error">
                        {errors.type.message}
                      </Badge>
                    )}
                  </Box>

                  <Box>
                    <FormLabel htmlFor="propertyAddress">Dirección</FormLabel>
                    {propertyForDetails.address ? (
                      <EditAddress
                        address={propertyForDetails.address}
                        full="yes"
                      />
                    ) : (
                      <CreateAddress full="yes" />
                    )}
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyMedia">Imágenes</FormLabel>
                    <MediaList width="100%" property={property} />
                  </Box>
                  <Box>
                    <FormLabel>Publicaciones</FormLabel>
                    <PostList full="yes" property={property} />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyInventories">
                      Inventarios
                    </FormLabel>
                    <InventoriesList full="yes" property={property} />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyComments">
                      Comentarios
                    </FormLabel>
                    <Textarea
                      rows="7"
                      {...register("comment")}
                      id="propertyComments"
                      placeholder="Ingresa los comentarios"
                      value={propertyForDetails.comment}
                      onChange={(e) =>
                        setPropertyForDetails({
                          ...propertyForDetails,
                          comment: e.target.value,
                        })
                      }
                    />
                  </Box>
                </Stack>
              </SimpleGrid>
            </form>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <ConfirmDelete
              text="¿Estás seguro de que deseas eliminar esta propiedad?"
              topText="En caso de que esta propiedad cuente con publicaciones, inventarios, controles, etc. los mismos serán eliminados. "
              name="propiedad"
              functionToExecute={handleDeleteProperty}
              element={property}
            />
            <Button variant="cancel-action" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="confirm-add-button"
              onClick={handleSubmit(submitPropertyDetails)}
            >
              Confirmar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PropertyDetails;
