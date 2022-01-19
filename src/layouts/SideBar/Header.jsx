import React from "react";
import { Text, Tag, Image, Box } from "@chakra-ui/react";
import photo from "../../assets/photo.jpg";

const Header = () => (
  <>
    <Box display="flex" justifyContent="space-between">
      <Box p={4}>
        <Text fontSize="22px">Hola,</Text>
        <Text fontSize="22px" fontWeight="500">
          Nahuel
        </Text>
        <Tag
          fontSize="12px"
          fontWeight="bold"
          color="white"
          bgColor="defaultColor.500"
          boxShadow="base"
          borderRadius="15px"
          px={3}
          py={1.5}
          mt={2}
        >
          ADMINISTRADOR
        </Tag>
      </Box>
      <Image
        _hover={{
          transition: "transform .2s",
          transform: "scale(0.98)",
        }}
        boxShadow="base"
        mt={5}
        src={photo}
        mr={2}
        borderRadius="50%"
        w="80px"
        h="80px"
        objectFit="contain"
      />
    </Box>
  </>
);

export default Header;
