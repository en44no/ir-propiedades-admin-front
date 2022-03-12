import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Box,
} from "@chakra-ui/react";

const FullscreenImageModal = (props) => {
  const {
    src,
    alt,
    width,
    height,
    minWidth,
    maxWidth,
    text,
    description,
    borderRadius,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen} w="15%" textAlign="-webkit-center">
        <Image
          w={width ? width : null}
          h={height ? height : null}
          minW={minWidth ? minWidth : null}
          maxW={maxWidth ? maxWidth : null}
          borderRadius={borderRadius ? "7px" : null}
          src={src}
          cursor="pointer"
          objectFit="cover"
          alt={alt}
        />
      </Box>
      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay alignItems="center" h="100vh !important" />
        <ModalContent bg="defaultColor.400" color="#fff">
          <ModalHeader fontSize="1.1rem" mb="0" pb="0" pt="0.7rem">
            <Box>
              <Box>{text}</Box>
              {description && <Box fontSize="1rem">"{description}"</Box>}
            </Box>
          </ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} onClick={onClose} />
          <ModalBody pb="1.5rem">
            <Image
              borderRadius="7px"
              w="100%"
              h="100%"
              src={src}
              alt={alt}
              loading="lazy"
              objectFit="cover"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FullscreenImageModal;
