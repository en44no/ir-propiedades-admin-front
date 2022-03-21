import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, IconButton } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import AuthContext from "../../context/Auth/AuthContext";

const Footer = () => {
  const { logOut } = useContext(AuthContext);

  return (
    <>
      <Box
        w="100%"
        pt="2"
        borderTop="2px solid #cacaca"
        display="flex"
        h="10%"
        justifyContent="end"
      >
        <Link to="/login">
          <IconButton onClick={() => logOut()} ml={1} bg="transparent">
            <IoLogOutOutline fontSize="1.7rem" />
          </IconButton>
        </Link>
      </Box>
    </>
  );
};

export default Footer;
