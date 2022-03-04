import React, { useContext } from "react";
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
  FormLabel,
  Input,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import CustomersContext from "../../context/Customers/CustomersContext";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";

const CreateCustomer = (props) => {
  const { addCustomer } = useContext(CustomersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitCustomer = (data) => {
    addCustomer(data);
    //document.getElementById("requiredCustomer").style.display = "none";
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
          <DrawerCloseButton color="#fff" mt="2" />
          <DrawerHeader color="#fff" borderBottomWidth="1px">
            Agregar cliente
          </DrawerHeader>
          <DrawerBody color="#fff">
            <form id="CustomerForm" onSubmit={handleSubmit(submitCustomer)}>
              <Stack spacing="14px">
                <Box>
                  <FormLabel htmlFor="CustomerName">Nombre</FormLabel>
                  <Input
                    {...register("name")}
                    id="CustomerName"
                    placeholder="Ingresa el nombre"
                    autoComplete="off"
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="CustomerEmail">Email</FormLabel>
                  <Input
                    {...register("name")}
                    id="CustomerEmail"
                    placeholder="Ingresa el email"
                    autoComplete="off"
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="CustomerPhone">Teléfono</FormLabel>
                  <Input
                    {...register("name")}
                    id="CustomerPhone"
                    placeholder="Ingresa el télefono"
                    autoComplete="off"
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

export default CreateCustomer;
