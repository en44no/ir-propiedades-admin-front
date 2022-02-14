import React, { useState } from "react";
import { Text, Tag, Image, Box } from "@chakra-ui/react";
import photo from "../../assets/ir-logo.png";

const Header = () => {
  const [name, setName] = useState(sessionStorage.getItem("name"));

  return (
    <>
      <Box mb="2" display="flex" justifyContent="space-between">
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
          <Text fontSize="21px" display="flex" placeContent="center" mt="1">
            Hola,
            <Text fontSize="21px" fontWeight="500" ml="1">
              {name ? name : "Usuario"}
            </Text>
          </Text>

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
            ADMINISTRADOR
          </Tag>
        </Box>
      </Box>
    </>
  );
};

export default Header;
