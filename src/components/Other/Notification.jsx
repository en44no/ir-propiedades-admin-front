import React from "react";
import { createStandaloneToast } from "@chakra-ui/react";
import theme from "../../theme";

const Notification = (title, description, status, duration) => {
  const toast = createStandaloneToast({ theme: theme });

  toast({
    title: title,
    description: description,
    status: status,
    duration: duration ? duration : 4000,
    position: "bottom",
    isClosable: true,
  });

  return <></>;
};

export default Notification;
