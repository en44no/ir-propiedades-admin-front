import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Header = (props) => {
  const { title } = props;

  return (
    <>
      <Box p={5} margin={3} borderRadius="9px" border="2px solid #cacaca">
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="wider"
          fontSize="16px"
          textAlign="center"
        >
          {title}
        </Text>
      </Box>
    </>
  );
};

export default Header;
