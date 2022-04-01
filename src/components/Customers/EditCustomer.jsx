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
  FormLabel,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import CustomersContext from "../../context/Customers/CustomersContext";
import { useForm } from "react-hook-form";
import { FaUserEdit } from "react-icons/fa";
import EditAssociateProperty from "./EditAssociateProperty";

const EditCustomer = (props) => {
  const { editCustomer, associatedPropertiesPendingToAdd } =
    useContext(CustomersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { customer, direction } = props;
  const [reactiveCustomer, setReactiveCustomer] = useState(customer);

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
    editCustomer(data, customer._id);
    reset();
    onClose();
  };

  useEffect(() => {
    setReactiveCustomer(customer);
  }, [customer]);

  return (
    <>
      <FaUserEdit onClick={onOpen} cursor="pointer" fontSize="1.3rem" />
      <Drawer
        isOpen={isOpen}
        placement={direction ? direction : "right"}
        onClose={onClose}
      >
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
            Editar cliente
          </DrawerHeader>
          <DrawerBody color="#fff">
            <form id="CustomerEditForm" onSubmit={handleSubmit(submitCustomer)}>
              <Stack spacing="14px">
                <Box>
                  <FormLabel htmlFor="CustomerName">Nombre</FormLabel>
                  <Input
                    {...register("name", { required: "Nombre es requerido." })}
                    id="CustomerName"
                    placeholder="Ingresa el nombre"
                    autoComplete="off"
                    value={reactiveCustomer.name}
                    onChange={(e) =>
                      setReactiveCustomer({
                        ...reactiveCustomer,
                        name: e.target.value,
                      })
                    }
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
                    value={reactiveCustomer.email}
                    onChange={(e) =>
                      setReactiveCustomer({
                        ...reactiveCustomer,
                        email: e.target.value,
                      })
                    }
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
                    value={reactiveCustomer.phone}
                    onChange={(e) =>
                      setReactiveCustomer({
                        ...reactiveCustomer,
                        phone: e.target.value,
                      })
                    }
                  />
                  {errors.phone && (
                    <Badge variant="required-error">
                      {errors.phone.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="CustomerProperty">Propiedades</FormLabel>
                  <EditAssociateProperty
                    customer={customer}
                    customerHaveProperties={customer.ownerProperties.concat(
                      customer.tenantProperties
                    )}
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
              form="CustomerEditForm"
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

export default EditCustomer;
