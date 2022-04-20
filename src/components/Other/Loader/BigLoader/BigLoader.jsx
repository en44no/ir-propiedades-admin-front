import { Box } from "@chakra-ui/react";
import React from "react";
import "./bigLoader.css";

const BigLoader = (props) => {
  const { color } = props;
  return (
    <>
      <Box w='100%' h='100vh'>
        <Box 
          color={color == "white" ? "#fff" : "#304580"}
          className="bigLoader"
        ></Box>
      </Box>
    </>
  );
};

export default BigLoader;
