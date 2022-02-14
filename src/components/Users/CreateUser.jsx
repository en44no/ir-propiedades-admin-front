import React, { useContext } from "react";
import {
  FormLabel,
  Input,
  Box,
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Select,
  Badge,
  Textarea,
  DrawerFooter,
} from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";
import { useForm } from "react-hook-form";

function CreateUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //const { addProperty, address, setAddress } = useContext(PropertiesContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmitProperty = async (data) => {
    //await addProperty(data);
    reset();
    onClose();
  };

  const submitForm = () => {
    document.getElementById("submitButtonCreateProperty").click();
  };

  return (
    <>
      <Button
        w="7rem"
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
            Agregar propiedad
          </DrawerHeader>
          <DrawerBody color="#fff">
            <form onSubmit={handleSubmit(handleSubmitProperty)}>
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
                    defaultValue="option1"
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
                <Button
                  visibility="hidden"
                  type="submit"
                  id="submitButtonCreateProperty"
                ></Button>
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
            <Button onClick={submitForm} variant="confirm-add-button">
              Confirmar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CreateUser;
