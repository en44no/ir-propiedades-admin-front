import React, { useContext, useEffect, useState } from "react";
import { Tag, Image, Box, HStack } from "@chakra-ui/react";
import photo from "../../assets/ir-logo.png";
import AuthContext from "../../context/Auth/AuthContext";

const Header = () => {
  const [name, setName] = useState(sessionStorage.getItem("userLoggedName"));
  const [roles, setRoles] = useState(sessionStorage.getItem("userLoggedRoles"));
  const { userRealName, userRoles } = useContext(AuthContext);

  useEffect(() => {
    if (userRealName) {
      setName(userRealName);
    }
    if (userRoles) {
      setRoles(userRoles);
    }
  }, [userRealName, userRoles]);

  return (
    <>
      <Box h="25%" mb="2" display="flex" justifyContent="space-between">
        <Box p={4} w="100%" align="center">
          <Image
            _hover={{
              transition: "transform .2s",
              transform: "scale(0.98)",
            }}
            src={photo}
            mt="-8px"
            w="80px"
            h="80px"
            objectFit="contain"
          />
          <Box fontSize="21px" display="flex" placeContent="center" mt="1">
            Hola,
            <Box fontSize="21px" fontWeight="500" ml="1">
              {userRealName != "Usuario" ? userRealName : name}
            </Box>
          </Box>

          {roles != null ? (
            <HStack flexDirection="column" spacing="10px">
              {userRoles != ""
                ? userRoles
                    .toString()
                    .split(",")
                    .map((role, index) => (
                      <Tag
                        key={index}
                        fontSize="12px"
                        fontWeight="bold"
                        color="white"
                        bgColor="defaultColor.400"
                        boxShadow="base"
                        borderRadius="15px"
                        px={3}
                        py={1.5}
                        mt={2}
                        mb={2}
                      >
                        {role.toUpperCase()}
                      </Tag>
                    ))
                : roles.split(",").map((role, index) => (
                    <Tag
                      key={index}
                      fontSize="12px"
                      fontWeight="bold"
                      color="white"
                      bgColor="defaultColor.400"
                      boxShadow="base"
                      borderRadius="15px"
                      px={3}
                      py={1.5}
                      mt={2}
                      mb={2}
                    >
                      {role.toUpperCase()}
                    </Tag>
                  ))}
            </HStack>
          ) : (
            <Tag
              fontSize="12px"
              fontWeight="bold"
              color="white"
              bgColor="defaultColor.400"
              boxShadow="base"
              borderRadius="15px"
              px={3}
              py={1.5}
              mt={2}
            >
              FUNCIONARIO
            </Tag>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Header;
