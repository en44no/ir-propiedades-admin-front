import {
  Badge,
  Box,
  Button,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const login = () => {
    navigate("/properties");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogin = async (data) => {
    login();
  };

  const submitForm = () => {};

  return (
    <>
      <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
        <Box
          border="2px solid #e3e3e3 !important"
          p="4"
          maxW="md"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image
            src="https://res.cloudinary.com/t3p/image/upload/v1632783660/realty-agancy/logo-full_jkcyon.png"
            _hover={{
              transition: "transform .2s",
              transform: "scale(0.98)",
            }}
          />
          <form onSubmit={handleSubmit(handleLogin)}>
            <VStack spacing="14px" px="4" py="4">
              <Box w="100%">
                <Input
                  type="email"
                  {...register("userName", {
                    required: " El nombre de usuario es requerido.",
                  })}
                  autoFocus
                  border="2px solid #e3e3e3"
                  placeholder="Ingresa tu nombre de usuario"
                />
                {errors.userName && (
                  <Badge variant="required-error">
                    {errors.userName.message}
                  </Badge>
                )}
              </Box>
              <Box w="100%">
                <InputGroup size="md">
                  <Input
                    {...register("password", {
                      required: "La contraseña es requerida.",
                    })}
                    border="2px solid #e3e3e3"
                    placeholder="Ingresa tu contraseña"
                    type={show ? "text" : "password"}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      _hover={{ boxShadow: "none", bg: "defaultColor.50" }}
                      h="1.75rem"
                      mr="2"
                      bg="none"
                      color="defaultColor.500"
                      size="sm"
                      onClick={handleClick}
                    >
                      {show ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <Badge variant="required-error">
                    {errors.password.message}
                  </Badge>
                )}
              </Box>
              <Button type="submit" variant="add-button" w="100%" color="#fff">
                Acceder
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;
