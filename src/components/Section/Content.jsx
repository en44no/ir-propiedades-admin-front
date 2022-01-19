import React from "react";
import { Box } from "@chakra-ui/react";

const Content = (props) => {
  const { children } = props;

  return (
    <>
      <Box
        h="97%"
        p={5}
        marginX={3}
        borderRadius="9px"
        border="2px solid #e3e3e3"
      >
        {children}
      </Box>
    </>
  );
};

export default Content;
