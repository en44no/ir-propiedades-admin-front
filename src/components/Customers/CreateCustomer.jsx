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
  useDisclosure,
} from "@chakra-ui/react";
import CustomersContext from "../../context/Customers/CustomersContext";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { BsFillHouseDoorFill } from "react-icons/bs";
import AssociateProperty from "./AssociateProperty";

const CreateCustomer = (props) => {
  const { addCustomer, associatedPropertiesPendingToAdd } =
    useContext(CustomersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customerType, setCustomerType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitCustomer = (data) => {
    if (associatedPropertiesPendingToAdd !== null) {
      data.ownerProperties = associatedPropertiesPendingToAdd.ownerProperties;
      data.tenantProperties = associatedPropertiesPendingToAdd.tenantProperties;
    }
    addCustomer(data);
    reset();
    onClose();
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
        Agregar
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="defaultColor.400">
          <DrawerCloseButton
            _focus={{ boxShadow: "none" }}
            color="#fff"
            mt="2"
          />
          <DrawerHeader color="#fff" borderBottomWidth="1px">
            Agregar cliente
          </DrawerHeader>
          <DrawerBody color="#fff">
            <form id="CustomerForm" onSubmit={handleSubmit(submitCustomer)}>
              <Stack spacing="14px">
                <Box>
                  <FormLabel htmlFor="CustomerName">Nombre</FormLabel>
                  <Input
                    {...register("name", { required: "Nombre es requerido." })}
                    id="CustomerName"
                    placeholder="Ingresa el nombre"
                    autoComplete="off"
                  />
                  {errors.name && (
                    <Badge variant="required-error">
                      {errors.name.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="CustomerEmail">Email</FormLabel>
                  <Input
                    {...register("email", { required: "Email es requerido." })}
                    id="CustomerEmail"
                    placeholder="Ingresa el email"
                    autoComplete="off"
                    type="email"
                  />
                  {errors.email && (
                    <Badge variant="required-error">
                      {errors.email.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="CustomerPhone">Teléfono</FormLabel>
                  <Input
                    {...register("phone", {
                      required: "Teléfono es requerido.",
                    })}
                    type="number"
                    id="CustomerPhone"
                    placeholder="Ingresa el télefono"
                    autoComplete="off"
                  />
                  {errors.phone && (
                    <Badge variant="required-error">
                      {errors.phone.message}
                    </Badge>
                  )}
                </Box>

                <Box>
                  <FormLabel htmlFor="CustomerProperty">Propiedades</FormLabel>
                  <AssociateProperty />
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
              form="CustomerForm"
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

export default CreateCustomer;
