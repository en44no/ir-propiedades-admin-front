import { Badge, Box } from "@chakra-ui/react";
import React from "react";

const BadgePostState = (props) => {
  const { bgColor, textColor, text } = props;

  return (
    <>
      <Badge
        minW="100%"
        maxW="100%"
        borderRadius="7px"
        px="0"
        py="0.5"
        fontSize="11px"
        bgColor="defaultColor.400"
        border={bgColor ? `2px solid ${bgColor}` : "defaultColor.400"}
        color={textColor ? textColor : "#fff"}
      >
        <Box textAlign="center">{text}</Box>
      </Badge>
    </>
  );
};

export default BadgePostState;
