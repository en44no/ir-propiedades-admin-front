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

const CreateCustomer = (props) => {
  const { addCustomer } = useContext(CustomersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customerType, setCustomerType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitCustomer = (data) => {
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
                  <FormLabel htmlFor="CustomerType">Tipo</FormLabel>
                  <Select
                    {...register("type", { required: "Tipo es requerido." })}
                    id="CustomerType"
                    placeholder="Selecciona el tipo"
                    onChange={(event) => setCustomerType(event.target.value)}
                  >
                    <option value="Dueño">Dueño</option>
                    <option value="Interesado">Interesado</option>
                    <option value="Inquilino">Inquilino</option>
                  </Select>
                  {errors.type && (
                    <Badge variant="required-error">
                      {errors.type.message}
                    </Badge>
                  )}
                </Box>
                {customerType == "Dueño" || customerType == "Inquilino" ? (
                  <Box>
                    <FormLabel htmlFor="CustomerProperty">
                      Código interno de la propiedad
                    </FormLabel>
                    <Input
                      {...register("property")}
                      id="CustomerProperty"
                      placeholder="Ingresa el código"
                      autoComplete="off"
                    />
                  </Box>
                ) : null}
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
