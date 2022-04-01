import React, { useContext, useEffect, useState } from "react";
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
  const { editUser, roles } = useContext(UsersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reactiveUser, setReactiveUser] = useState(user);

  const [showPassword, setShowPassword] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [showPasswordErrorMessage, setShowPasswordErrorMessage] =
    useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowEditPassword = () => {
    if (showEditPassword) {
      setShowEditPassword(false);
      setShowPasswordErrorMessage(false);
    } else {
      setShowEditPassword(true);
    }
  };

  useEffect(() => {
    setReactiveUser(user);
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmitEditUser = async (data) => {
    if (data.editPassword === false) {
      editUser(data, user._id);
      reset();
      onClose();
    } else {
      if (data.password === undefined || data.password?.trim() === "") {
        setShowPasswordErrorMessage(true);
      } else {
        editUser(data, user._id);
        reset();
        onClose();
      }
    }
  };

  return (
    <>
      <FaUserEdit onClick={onOpen} cursor="pointer" fontSize="1.3rem" />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
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
                    value={reactiveUser.name}
                    onChange={(e) =>
                      setReactiveUser({
                        ...reactiveUser,
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
                    value={reactiveUser.username}
                    onChange={(e) =>
                      setReactiveUser({
                        ...reactiveUser,
                        username: e.target.value,
                      })
                    }
                  />
                  {errors.username && (
                    <Badge variant="required-error">
                      {errors.username.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="userEmail">Email</FormLabel>
                  <Input
                    {...register("email", {
                      required: "Email es requerido.",
                    })}
                    id="userEmail"
                    placeholder="Ingresa el email"
                    autoComplete="off"
                    type="email"
                    value={reactiveUser.email}
                    onChange={(e) =>
                      setReactiveUser({
                        ...reactiveUser,
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
                          defaultChecked={user.roles
                            .map((role) => role._id)
                            .includes(role._id)}
                        />
                      </Box>
                    ))}
                  </FormControl>
                </Box>
                <Box>
                  <Box display="flex">
                    <FormLabel htmlFor="editPasswordSwitch">
                      Editar contraseña
                    </FormLabel>
                    <Switch
                      mt="2px"
                      value={true}
                      {...register("editPassword")}
                      id="editPasswordSwitch"
                      onChange={handleShowEditPassword}
                    />
                  </Box>
                  <InputGroup size="md">
                    <Input
                      id="userPassword"
                      autoComplete="current-password"
                      {...register("password")}
                      border="1px solid #cacaca"
                      placeholder="Ingresa la nueva contraseña"
                      type={showPassword ? "text" : "password"}
                      disabled={showEditPassword ? false : true}
                      value={!showEditPassword ? "" : null}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        _hover={{ boxShadow: "none", bg: "defaultColor.300" }}
                        h="1.75rem"
                        mr="-5"
                        bg="none"
                        color="#fff"
                        size="sm"
                        onClick={handleShowPassword}
                      >
                        {showPassword ? (
                          <ImEyeBlocked fontSize="18px" />
                        ) : (
                          <ImEye fontSize="18px" />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Badge
                    display={
                      showPasswordErrorMessage === true ? "block" : "none"
                    }
                    variant="required-error"
                  >
                    La contraseña es requerida.
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
