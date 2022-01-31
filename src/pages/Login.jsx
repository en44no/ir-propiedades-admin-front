import React, { useState, useContext, useEffect } from "react";
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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { authenticateUser, logOut } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentialError, setShowCredentialError] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const login = () => {
    navigate("/properties");
  };
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      logOut();
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogin = async (data) => {
    await authenticateUser(data);
    if (data.isAuthenticated) {
      login();
    } else {
      setShowCredentialError(true);
    }
  };

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
                  onKeyUp={() => setShowCredentialError(false)}
                  id="username"
                  autocomplete="username"
                  {...register("username", {
                    required: " El nombre de usuario es requerido.",
                  })}
                  autoFocus
                  border="2px solid #e3e3e3"
                  placeholder="Ingresa tu nombre de usuario"
                />
                {errors.username && (
                  <Badge variant="required-error">
                    {errors.username.message}
                  </Badge>
                )}
              </Box>
              <Box w="100%">
                <InputGroup size="md">
                  <Input
                    onKeyUp={() => setShowCredentialError(false)}
                    id="current-password"
                    autocomplete="current-password"
                    {...register("password", {
                      required: "La contraseña es requerida.",
                    })}
                    border="2px solid #e3e3e3"
                    placeholder="Ingresa tu contraseña"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      _hover={{ boxShadow: "none", bg: "defaultColor.50" }}
                      h="1.75rem"
                      mr="-5"
                      bg="none"
                      color="defaultColor.500"
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
              {showCredentialError && (
                <Badge variant="required-error">
                  Nombre de usuario o contraseña incorrectos.
                </Badge>
              )}
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
