import React from "react";
import { Box, Badge } from "@chakra-ui/react";

const BadgePropertyCard = (props) => {
  const { title, icon } = props;

  return (
    <Badge
      w="auto"
      justifyContent="center"
      borderRadius="7px"
      ml="-0.5"
      px="2"
      py="0.5"
      bg="defaultColor.400"
      color="#fff"
      display="flex"
      alignItems="center"
    >
      <Box mr="1" fontSize="0.9rem">
        {icon}
      </Box>
      <Box>{title}</Box>
    </Badge>
  );
};

export default BadgePropertyCard;
