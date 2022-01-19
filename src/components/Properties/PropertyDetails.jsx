import React, { useContext, useEffect, useState } from "react";
import {
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
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiInfo } from "react-icons/fi";
import PropertiesContext from "../../context/PropertiesContext";
import ConfirmDeleteProperty from "./ConfirmDeleteProperty";
import CreatePost from "./Posts/CreatePost";
import PostList from "./Posts/PostList";

const PropertyDetails = (props) => {
  const { deleteProperty, getPostsByProperty, propertyPosts } =
    useContext(PropertiesContext);
  const { propertyName, property } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const setPostsUseForm = useForm();

  const handleDeleteProperty = () => {
    deleteProperty(property);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      getPostsByProperty(property._id);
    }
  }, [isOpen]);

  return (
    <>
      <Button
        position="absolute"
        p="0"
        right="2"
        top="2"
        onClick={onOpen}
        variant="add-button"
        borderRadius="50%"
        color="white"
      >
        <FiInfo fontSize={22} />
      </Button>
      <Drawer size="xl" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="defaultColor.400">
          <DrawerCloseButton color="#fff" mt="2" />
          <DrawerHeader color="#fff" borderBottomWidth="1px">
            Detalles de la propiedad {propertyName ? `"${propertyName}"` : ""}
          </DrawerHeader>
          <DrawerBody color="#fff">
            <form>
              <RadioGroup
                display="flex"
                justifyContent="center"
                mt="1rem"
                mb="1rem"
              >
                <Stack direction="row">
                  <Radio id="usdPrices" value="usdPrices">
                    <FormLabel htmlFor="usdPrices" mb="0">
                      Precios en USD
                    </FormLabel>
                  </Radio>
                  <Radio id="pesosPrices" value="pesosPrices">
                    <FormLabel htmlFor="pesosPrices" mb="0">
                      Precios en Pesos
                    </FormLabel>
                  </Radio>
                </Stack>
              </RadioGroup>
              <SimpleGrid columns={2} spacing={10}>
                <Box display="flex" mb="4">
                  <FormControl display="flex" mt="2rem" alignItems="center">
                    <FormLabel htmlFor="sellSwitch" mb="0">
                      Disponible para vender
                    </FormLabel>
                    <Switch id="sellSwitch" />
                  </FormControl>
                  <Box>
                    <FormLabel textAlign="center" htmlFor="salePrice">
                      Precio venta
                    </FormLabel>
                    <Input id="salePrice"></Input>
                  </Box>
                </Box>
                <Box display="flex" mb="4">
                  <FormControl display="flex" mt="2rem" alignItems="center">
                    <FormLabel htmlFor="rentSwitch" mb="0">
                      Disponible para alquilar
                    </FormLabel>
                    <Switch id="rentSwitch" />
                  </FormControl>
                  <Box>
                    <FormLabel textAlign="center" htmlFor="rentPrice">
                      Precio alquiler
                    </FormLabel>
                    <Input id="rentPrice"></Input>
                  </Box>
                </Box>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={10}>
                <Stack spacing="14px" id="leftColumn">
                  <Box>
                    <FormLabel htmlFor="propertyTypes">Tipo</FormLabel>
                    <Select
                      {...register("type", { required: "Types es requerido." })}
                      id="propertyTypes"
                      defaultValue="option1"
                      placeholder="Agrega el tipo"
                    >
                      <option value="House">Casa</option>
                      <option value="Deposit">Depósito</option>
                      <option value="Apartment">Apartamento</option>
                    </Select>
                    {errors.types && <span>wadwad</span>}
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyComments">
                      Comentarios
                    </FormLabel>
                    <Textarea
                      {...register("comment")}
                      id="propertyComments"
                      placeholder="Agrega los comentarios"
                    />
                    {errors.comments && <span>wad</span>}
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyComments">
                      Características
                    </FormLabel>
                    <Input></Input>
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyComments">
                      Tours virtuales
                    </FormLabel>
                    <Input></Input>
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyComments">Dirección</FormLabel>
                    <Input></Input>
                  </Box>
                </Stack>
                <Stack spacing="14px" id="rightColumn">
                  <Box>
                    <FormLabel htmlFor="propertyState">Estado</FormLabel>
                    <Select
                      {...register("type", {
                        required: "Types es requerido.",
                      })}
                      id="propertyState"
                      defaultValue="option1"
                      placeholder="Agrega el tipo"
                    >
                      <option value="House">Casa</option>
                      <option value="Deposit">Depósito</option>
                      <option value="Apartment">Apartamento</option>
                    </Select>
                    {errors.types && <span>wadwad</span>}
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyDescription">
                      Descripcion
                    </FormLabel>
                    <Textarea
                      {...register("description")}
                      id="propertyDescription"
                      placeholder="Agrega los Description"
                    />
                    {errors.comments && <span>wad</span>}
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyComments">Documentos</FormLabel>
                    <Input></Input>
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyComments">Media</FormLabel>
                    <Input></Input>
                  </Box>
                  <Box>
                    <FormLabel>Publicaciones</FormLabel>
                    {propertyPosts.length > 0 ? (
                      <PostList
                        propertyPosts={propertyPosts}
                        full="yes"
                        property={property}
                      />
                    ) : (
                      <Box>
                        <CreatePost property={property} full="yes" />
                      </Box>
                    )}
                    <Box>
                      <FormLabel htmlFor="propertyComments">
                        Inventarios
                      </FormLabel>
                      <Input></Input>
                    </Box>
                  </Box>
                </Stack>
                <Button
                  visibility="hidden"
                  type="submit"
                  id="submitButtonCreateProperty"
                ></Button>
              </SimpleGrid>
            </form>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <ConfirmDeleteProperty
              handleDeleteProperty={handleDeleteProperty}
            />
            <Button variant="cancel-action" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="confirm-add-button">Confirmar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PropertyDetails;
