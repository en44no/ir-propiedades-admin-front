import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

const SideBar = () => (
  <>
    <Box
      border="2px solid #cacaca"
      p={3}
      h="96vh"
      margin={3}
      position="relative"
      borderRadius="9px"
      display="flex"
      flexDirection="column"
    >
      <Header />
      <Content />
      <Box m={3} mb="0">
        <Footer />
      </Box>
    </Box>
  </>
);

export default SideBar;
