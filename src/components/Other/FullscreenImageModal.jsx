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

const FullscreenImageModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen} w="15%" textAlign="-webkit-center">
        <Image
          w="3rem"
          h="2rem"
          borderRadius="7px"
          src="https://images7.alphacoders.com/344/thumb-1920-344344.jpg"
          _hover={{
            cursor: "pointer",
            position: "absolute !important",
            w: "12rem !important",
            height: "8rem !important",
            top: "0.5rem",
          }}
        />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay alignItems="center" h="100vh !important" />
        <ModalContent bg="defaultColor.400" color="#fff">
          <ModalHeader fontSize="1.1rem" mb="0" pb="0" pt="0.7rem">
            Imagen del objeto "Manzana"
          </ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} onClick={onClose} />
          <ModalBody pb="1.5rem">
            <Image
              borderRadius="7px"
              w="100%"
              h="100%"
              src="https://images7.alphacoders.com/344/thumb-1920-344344.jpg"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FullscreenImageModal;
