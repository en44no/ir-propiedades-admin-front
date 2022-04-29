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
  Tooltip,
} from "@chakra-ui/react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const FullscreenImageModal = (props) => {
  const { src, alt, text, description, borderRadius, width, height } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        setIsVisible(true);
        observerElement.unobserve(ref.current);
      }
    },
  });

  return (
    <>
      <Tooltip
        hasArrow
        label="Click para ver en pantalla completa"
        bg="defaultColor.500"
      >
        <Box ref={ref} onClick={onOpen} textAlign="-webkit-center">
          {isVisible && (
            <Image
              w={width ? width : "220px"}
              h={height ? height : "110px"}
              borderRadius={borderRadius ? "7px" : null}
              src={src}
              cursor="pointer"
              objectFit="cover"
              alt={alt}
              loading="lazy"
            />
          )}
        </Box>
      </Tooltip>
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
          <ModalBody p="1.5rem">
            <Image
              p="0rem"
              borderRadius="7px"
              w="100%"
              h="100%"
              maxH="30rem"
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
