import React, { useContext, useState } from "react";
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
  Badge,
  DrawerFooter,
  Text,
  FormControl,
  SimpleGrid,
  Switch,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";
import { useForm } from "react-hook-form";
import UsersContext from "../../context/Users/UsersContext";
import { ImEye, ImEyeBlocked } from "react-icons/im";

function CreateUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addUser, roles } = useContext(UsersContext);
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmitCreateUser = async (data) => {
    await addUser(data);
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
        <Text mt="-0.5">Agregar</Text>
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="defaultColor.400">
          <DrawerCloseButton color="#fff" mt="2" />
          <DrawerHeader color="#fff" borderBottomWidth="1px">
            Agregar usuario
          </DrawerHeader>
          <DrawerBody color="#fff">
            <form
              id="createUserForm"
              onSubmit={handleSubmit(handleSubmitCreateUser)}
            >
              <Stack spacing="14px">
                <Box>
                  <FormLabel htmlFor="userName">Nombre</FormLabel>
                  <Input
                    {...register("name", { required: "Nombre es requerido." })}
                    id="userName"
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
                  <FormLabel htmlFor="userUserName">
                    Nombre de usuario
                  </FormLabel>
                  <Input
                    {...register("username", {
                      required: "Nombre de usuario es requerido.",
                    })}
                    id="userUserName"
                    placeholder="Ingresa el nombre de usuario"
                    autoComplete="off"
                  />
                  {errors.username && (
                    <Badge variant="required-error">
                      {errors.username.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="userRoles">
                    Selecciona los roles
                  </FormLabel>
                  <FormControl
                    as={SimpleGrid}
                    columns="1"
                    p="0.5rem 0.5rem 0 0.5rem"
                    border="1.5px solid #cacaca"
                    borderRadius="7px"
                    justifyItems="center"
                  >
                    {roles.map((role) => (
                      <Box
                        key={role._id}
                        display="flex"
                        w="100%"
                        justifyContent="center"
                        justifyItems="center"
                      >
                        <FormLabel mt="-3px" htmlFor={role.name}>
                          {role.name}
                        </FormLabel>
                        <Switch
                          value={role._id}
                          {...register("roles")}
                          id={role.name}
                        />
                      </Box>
                    ))}
                  </FormControl>
                </Box>
                <Box>
                  <FormLabel htmlFor="userPassword">Contraseña</FormLabel>
                  <InputGroup size="md">
                    <Input
                      id="userPassword"
                      autoComplete="current-password"
                      {...register("password", {
                        required: "La contraseña es requerida.",
                      })}
                      border="1px solid #cacaca"
                      placeholder="Ingresa tu contraseña"
                      type={showPassword ? "text" : "password"}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        _hover={{ boxShadow: "none", bg: "defaultColor.300" }}
                        h="1.75rem"
                        mr="-5"
                        bg="none"
                        color="#fff"
                        size="sm"
                        onClick={handleClick}
                      >
                        {showPassword ? (
                          <ImEyeBlocked fontSize="18px" />
                        ) : (
                          <ImEye fontSize="18px" />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <Badge variant="required-error">
                      {errors.password.message}
                    </Badge>
                  )}
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
              form="createUserForm"
              variant="confirm-add-button"
            >
              Confirmar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CreateUser;
