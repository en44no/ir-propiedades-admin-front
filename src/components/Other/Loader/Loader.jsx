import { Box } from "@chakra-ui/react";
import React from "react";
import "./loader.css";

const Loader = (props) => {
  const { color } = props;
  return (
    <>
      <Box
        color={color == "white" ? "#fff" : "#304580"}
        className="loader"
      ></Box>
    </>
  );
};

export default Loader;
