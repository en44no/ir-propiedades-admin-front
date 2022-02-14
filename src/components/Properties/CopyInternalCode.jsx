import { Text, useToast } from "@chakra-ui/react";
import React from "react";

const CopyInternalCode = (props) => {
  const { internalCode, noMarginLeft } = props;
  const notification = useToast();
  const toastId = "email-toast";

  const notificationAndCopyToClipboard = () => {
    if (!notification.isActive(toastId)) {
      notification({
        id: toastId,
        title: "Código de propiedad copiado al portapapeles",
        description: `Has copiado el código ${internalCode}`,
        status: "success",
        duration: 4000,
        position: "bottom",
        isClosable: true,
      });
    }
    navigator.clipboard.writeText(internalCode);
  };

  return (
    <>
      <Text
        ml={noMarginLeft ? 0 : 1.5}
        cursor="pointer"
        onClick={() => {
          notificationAndCopyToClipboard();
        }}
      >
        {internalCode}
      </Text>
    </>
  );
};

export default CopyInternalCode;
