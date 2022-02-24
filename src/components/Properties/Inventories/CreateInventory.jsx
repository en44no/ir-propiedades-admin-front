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
  FormLabel,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";
import { Controller, useForm } from "react-hook-form";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import DatePicker from "../../Other/DatePicker/DatePicker";

const CreateInventory = (props) => {
  const { normalAddButton } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addressToAdd } = useContext(PropertiesContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const handleSubmitInventory = async (data) => {
    if (addressToAdd !== null) {
      //await addProperty(data, addressToAdd);
      reset();
      onClose();
    }
  };

  return (
    <>
      <Button
        w="8rem"
        onClick={onOpen}
        fontSize="15px"
        leftIcon={<HiPlus fontSize="1.2rem" />}
        borderRadius="9px"
        variant={normalAddButton ? "add-button-dark" : "add-button-clear"}
      >
        <Text mt="-1">Agregar</Text>
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="defaultColor.400">
          <DrawerCloseButton color="#fff" mt="2" />
          <DrawerHeader color="#fff" borderBottomWidth="1px">
            Agregar inventario
          </DrawerHeader>
          <DrawerBody color="#fff">
            <form
              id="propertyForm"
              onSubmit={handleSubmit(handleSubmitInventory)}
            >
              <Stack spacing="14px">
                <Box>
                  <FormLabel htmlFor="createInventoryAddress">Fecha</FormLabel>
                  <Controller
                    control={control}
                    name="address"
                    render={({ field }) => (
                      <DatePicker
                        field={field}
                        placeholderText={"Ingresa la fecha"}
                        id={"createInventoryAddress"}
                      />
                    )}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="createInventoryDescription">
                    Descripción
                  </FormLabel>
                  <Textarea
                    {...register("description", {
                      required: "Descripción es requerido.",
                    })}
                    id="createInventoryDescription"
                    placeholder="Ingresa la descripción"
                    autoComplete="off"
                  />
                  {errors.description && (
                    <Badge variant="required-error">
                      {errors.description.message}
                    </Badge>
                  )}
                </Box>
                <Box mt="-14">
                  <FormLabel htmlFor="createInventoryState">Estado</FormLabel>
                  <Select
                    {...register("status", {
                      required: "Estado es requerido.",
                    })}
                    id="createInventoryState"
                    placeholder="Ingresa el estado"
                  >
                    <option value="Open">Abierto</option>
                    <option value="Closed">Cerrado</option>
                  </Select>
                  {errors.status && (
                    <Badge variant="required-error">
                      {errors.status.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="propertyComments">Objetos</FormLabel>
                  <Textarea
                    {...register("comment")}
                    id="propertyComments"
                    placeholder="Ingresa los comentarios"
                    autoComplete="off"
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="propertyComments">Reseñas</FormLabel>
                  <Textarea
                    {...register("comment")}
                    id="propertyComments"
                    placeholder="Ingresa los comentarios"
                    autoComplete="off"
                  />
                </Box>
              </Stack>
            </form>
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

export default CreateInventory;
