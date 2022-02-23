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
  Input,
  Select,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import CustomersContext from "../../context/Customers/CustomersContext";
import { useForm } from "react-hook-form";
import { MdLocationPin } from "react-icons/md";

const EditCustomer = (props) => {
  const { editCustomer } = useContext(CustomersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { full, customer, direction } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitCustomer = (data) => {
    editCustomer(data, customer._id);
    reset();
    onClose();
  };

  return (
    <>
      <Button
        w={full === "yes" ? "100%" : "7rem"}
        onClick={onOpen}
        fontSize="15px"
        leftIcon={<MdLocationPin fontSize="18px" />}
        mr={5}
        mb={5}
        borderRadius="9px"
        variant="add-button-clear"
      >
        Editar cliente
      </Button>

      <Drawer
        isOpen={isOpen}
        placement={direction ? direction : "left"}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg="defaultColor.400">
          <DrawerCloseButton color="#fff" mt="2" />
          <DrawerHeader color="#fff" borderBottomWidth="1px">
            Editar cliente
          </DrawerHeader>
          <DrawerBody color="#fff">
            <form id="customerForm" onSubmit={handleSubmit(submitCustomer)}>
              <Stack spacing="14px">
              <Box>
                  <FormLabel htmlFor="CustomerName">Nombre</FormLabel>
                  <Input
                    {...register("name")}
                    id="CustomerName"
                    placeholder="Ingresa el nombre"
                    autoComplete="off"
                    defaultValue={customer.name}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="CustomerEmail">email</FormLabel>
                  <Input
                    {...register("name")}
                    id="CustomerEmail"
                    placeholder="Ingresa el email"
                    autoComplete="off"
                    defaultValue={customer.email}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="CustomerPhone">Telefono</FormLabel>
                  <Input
                    {...register("name")}
                    id="CustomerPhone"
                    placeholder="Ingresa el telefono"
                    autoComplete="off"
                    defaultValue={customer.phone}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="customerDescription">
                    Descripción
                  </FormLabel>
                  <Textarea
                    {...register("description")}
                    id="customerDescription"
                    placeholder="Ingresa la descripción"
                    autoComplete="off"
                    defaultValue={customer.description}
                  />
                </Box>
              </Stack>
            </form>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="cancel-action" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              form="customerForm"
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

export default EditAddress;
