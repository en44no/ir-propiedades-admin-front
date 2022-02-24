import React, { useContext, useState } from "react";
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
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";
import CreateAddress from "../Address/CreateAddress";
import { useForm } from "react-hook-form";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import EditAddress from "../Address/EditAddress";

const CreateProperty = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addProperty, addressToAdd, setAddressToAdd } =
    useContext(PropertiesContext);
  const [showAddressError, setShowAddressError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmitProperty = async (data) => {
    if (addressToAdd !== null) {
      await addProperty(data, addressToAdd);
      reset();
      onClose();
    } else {
      setShowAddressError(true);
    }
  };

  return (
    <>
      <Button
        w="8rem"
        onClick={onOpen}
        fontSize="15px"
        leftIcon={<HiPlus fontSize="1.2rem" />}
        mr={5}
        mb={5}
        borderRadius="9px"
        variant="add-button"
      >
        <Text mt="-0.5">Agregar</Text>
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="defaultColor.400">
          <DrawerCloseButton color="#fff" mt="2" />
          <DrawerHeader color="#fff" borderBottomWidth="1px">
            Agregar propiedad
          </DrawerHeader>
          <DrawerBody color="#fff">
            <form
              id="propertyForm"
              onSubmit={handleSubmit(handleSubmitProperty, () =>
                setShowAddressError(true)
              )}
            >
              <Stack spacing="14px">
                <Box>
                  <FormLabel htmlFor="propertyName">Nombre</FormLabel>
                  <Input
                    {...register("name")}
                    id="propertyName"
                    placeholder="Ingresa el nombre"
                    autoComplete="off"
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="propertyTypes">Tipo</FormLabel>
                  <Select
                    {...register("type", { required: "Tipo es requerido." })}
                    id="propertyTypes"
                    placeholder="Ingresa el tipo"
                  >
                    <option value="House">Casa</option>
                    <option value="Deposit">Depósito</option>
                    <option value="Apartment">Apartamento</option>
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
                    {...register("description")}
                    id="propertyDescription"
                    placeholder="Ingresa la descripción"
                    autoComplete="off"
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="propertyComments">Comentarios</FormLabel>
                  <Textarea
                    {...register("comment")}
                    id="propertyComments"
                    placeholder="Ingresa los comentarios"
                    autoComplete="off"
                  />
                </Box>
              </Stack>
            </form>
            <Box mt="4">
              <FormLabel htmlFor="propertyAddress">Dirección</FormLabel>
              {addressToAdd ? (
                <EditAddress
                  address={addressToAdd}
                  full="yes"
                  direction="right"
                />
              ) : (
                <Box>
                  <CreateAddress full="yes" />
                  <Badge
                    display={showAddressError ? "inline-block" : "none"}
                    id="requiredAddress"
                    mt="-9"
                    variant="required-error"
                  >
                    Dirección es requerido.
                  </Badge>
                </Box>
              )}
            </Box>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button
              color="#fff"
              variant="cancel-action"
              mr={3}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              form="propertyForm"
              variant="confirm-add-button"
            >
              Confirmar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateProperty;
