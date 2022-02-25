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
  FormControl,
  SimpleGrid,
  Switch,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaUserEdit } from "react-icons/fa";
import UsersContext from "../../context/Users/UsersContext";
import { ImEye, ImEyeBlocked } from "react-icons/im";

function EditUser(props) {
  const { user } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { editUser } = useContext(UsersContext);
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmitEditUser = async (data) => {
    editUser(data, user._id);
    reset();
    onClose();
  };

  const roles = [
    {
      id: 1,
      name: "Administrador1",
    },
    {
      id: 2,
      name: "Administrador2",
    },
    {
      id: 3,
      name: "Administrador3",
    },
  ];

  return (
    <>
      <FaUserEdit onClick={onOpen} cursor="pointer" fontSize="1.3rem" />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="defaultColor.400">
          <DrawerCloseButton color="#fff" mt="2" />
          <DrawerHeader color="#fff" borderBottomWidth="1px">
            Editar usuario
          </DrawerHeader>
          <DrawerBody color="#fff">
            <form
              id="createUserForm"
              onSubmit={handleSubmit(handleSubmitEditUser)}
            >
              <Stack spacing="14px">
                <Box>
                  <FormLabel htmlFor="userName">Nombre</FormLabel>
                  <Input
                    {...register("name", { required: "Nombre es requerido." })}
                    id="userName"
                    placeholder="Ingresa el nuevo nombre"
                    autoComplete="off"
                    defaultValue={user.name}
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
                    placeholder="Ingresa el nuevo nombre de usuario"
                    autoComplete="off"
                    defaultValue={user.username}
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
                        key={role.id}
                        display="flex"
                        w="100%"
                        justifyContent="center"
                        justifyItems="center"
                      >
                        <FormLabel htmlFor={role.name}>{role.name}</FormLabel>
                        <Switch id={role.name} />
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
                      {...register("password")}
                      border="2px solid #cacaca"
                      placeholder="Ingresa la nueva contraseña"
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
                  <Badge variant="required-warning">
                    Vacío para no cambiar la contraseña
                  </Badge>
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

export default EditUser;
