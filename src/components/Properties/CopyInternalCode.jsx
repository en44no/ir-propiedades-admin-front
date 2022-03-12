import { Box, Tooltip, useToast } from "@chakra-ui/react";
import React from "react";
import { IoMdCopy } from "react-icons/io";

const CopyInternalCode = (props) => {
  const { internalCode, noMarginLeft, text, iconSize } = props;
  const notification = useToast();
  const toastId = internalCode;

  const notificationAndCopyToClipboard = () => {
    if (!notification.isActive(toastId)) {
      notification({
        id: toastId,
        title: `Código de ${text} copiado al portapapeles`,
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
      <Box display="flex" justifyContent="center" ml={noMarginLeft ? 0 : 1.5}>
        {internalCode}
        <Tooltip
          hasArrow
          label="Copiar código al portapapeles"
          bg="defaultColor.500"
          mt="0.2rem"
        >
          <Box
            cursor="pointer"
            onClick={() => {
              notificationAndCopyToClipboard();
            }}
            alignSelf="center"
            ml="0.4rem"
          >
            <IoMdCopy fontSize={iconSize ? iconSize : null} />
          </Box>
        </Tooltip>
      </Box>
    </>
  );
};

export default CopyInternalCode;
