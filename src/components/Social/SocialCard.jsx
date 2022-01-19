import React from "react";
import { Box, Switch, FormLabel, Image } from "@chakra-ui/react";

const SocialCard = (props) => {
  const { appColor, appName, appIcon } = props;

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        border="1px solid"
        borderColor="inherit"
        borderRadius="7px"
        h="2.5rem"
        pl="0.9rem"
        pr="0.9rem"
        w="13rem"
        justifyContent="center"
        bg={appColor}
      >
        <FormLabel htmlFor={`social${appName}`} mt="0" mb="0" mr="2">
          {appIcon}
        </FormLabel>
        <FormLabel htmlFor={`social${appName}`} m="0">
          {appName}
        </FormLabel>
        <Switch ml="3" id={`social${appName}`} />
      </Box>
    </>
  );
};

export default SocialCard;
