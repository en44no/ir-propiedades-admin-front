import React, { useContext } from "react";
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
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BsFillInfoCircleFill } from "react-icons/bs";
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

const PropertyDetails = (props) => {
  const { deleteProperty, addDetailsToProperty } =
    useContext(PropertiesContext);
  const { property } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const submitPropertyDetails = (data) => {
    addDetailsToProperty(data, property);
    reset();
    onClose();
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
      >
        <Box fontSize="1rem">
          <BsFillInfoCircleFill />
        </Box>
        {/*
        ESTO ES PARA CUANDO LA PROPIEDAD NO TENGA TODOS LOS DATOS COMPLETADOS
         <Box fontSize="0.9rem">
          <GoAlert />
        </Box> */}
      </Button>
      <Drawer size="xl" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          borderLeft="1px white solid"
          bg="defaultColor.400"
          borderStartStartRadius="7px"
          borderEndStartRadius="7px"
        >
          <DrawerCloseButton color="#fff" mt="2" />
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
          <DrawerBody color="#fff">
            <form>
              <SimpleGrid columns={2} spacing={10}>
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
                    <FormLabel textAlign="center" htmlFor="detailsSellPrice">
                      Tasación venta
                    </FormLabel>
                    <Input
                      defaultValue={property.appraisedSalePrice || 0}
                      {...register("appraisedSalePrice")}
                      id="detailsSellPrice"
                    ></Input>
                  </Box>
                </Box>
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
                    <FormLabel textAlign="center" htmlFor="detailsRentPrice">
                      Tasación alquiler
                    </FormLabel>
                    <Input
                      defaultValue={property.appraisedRentPrice || 0}
                      {...register("appraisedRentPrice")}
                      id="detailsRentPrice"
                    ></Input>
                  </Box>
                </Box>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={10}>
                <Stack spacing="14px" id="leftColumn">
                  <Box>
                    <FormLabel htmlFor="propertyName">Nombre</FormLabel>
                    <Input
                      defaultValue={property.name}
                      {...register("comment")}
                      id="propertyName"
                      placeholder="Ingresa el nombre"
                    />
                    {errors.name && <span>wad</span>}
                  </Box>

                  <Box>
                    <FormLabel htmlFor="propertyComments">
                      Comentarios
                    </FormLabel>
                    <Textarea
                      defaultValue={property.comment}
                      {...register("comment")}
                      id="propertyComments"
                      placeholder="Ingresa los comentarios"
                    />
                    {errors.comments && <span>wad</span>}
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyComments">
                      Características
                    </FormLabel>
                    <Box>
                      <FeatureList property={property} full="yes" />
                    </Box>
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyComments">Documentos</FormLabel>
                    <Input></Input>
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyComments">
                      Tour virtual
                    </FormLabel>
                    <VirtualToursList full="yes" property={property} />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyAddress">Dirección</FormLabel>
                    {property.address ? (
                      <EditAddress address={property.address} full="yes" />
                    ) : (
                      <CreateAddress full="yes" />
                    )}
                  </Box>
                </Stack>
                <Stack spacing="14px" id="rightColumn">
                  <Box>
                    <FormLabel htmlFor="propertyTypes">Tipo</FormLabel>
                    <Select
                      {...register("type", { required: "Tipo es requerido." })}
                      id="propertyType"
                      defaultValue={property.type}
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
                    <FormLabel htmlFor="propertyDescription">
                      Descripción
                    </FormLabel>
                    <Textarea
                      defaultValue={property.description}
                      {...register("description")}
                      id="propertyDescription"
                      placeholder="Ingresa la descripción"
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyComments">Imágenes</FormLabel>
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
                </Stack>
              </SimpleGrid>
            </form>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <ConfirmDelete
              text="¿Estás seguro de que deseas eliminar esta propiedad?"
              topText="En caso de que esta propiedad cuente con publicaciones y/o inventarios los mismos serán eliminados. "
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
