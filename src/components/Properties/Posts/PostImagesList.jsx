import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Tooltip,
  HStack,
  Flex,
  Center,
} from "@chakra-ui/react";
import { BsImages } from "react-icons/bs";
import FullscreenImageModal from "../../Other/FullscreenImageModal";
import Notification from "../../Other/Notification";
import CopyInternalCode from "../CopyInternalCode";

const PostImagesList = (props) => {
  const { images, post } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip hasArrow label="Ver imágenes" bg="defaultColor.500">
        <HStack
          cursor="pointer"
          px="3"
          py="1.5"
          bg="defaultColor.400"
          borderRadius="7px"
          alignItems="center"
          onClick={onOpen}
        >
          <Box fontSize="0.8rem" fontWeight="500">
            {images.length}
          </Box>
          <BsImages fontSize="20px" />
        </HStack>
      </Tooltip>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay alignItems="center" h="100vh !important" />
        <ModalContent bg="defaultColor.400" color="#fff">
          <ModalHeader fontSize="1.1rem" mb="0" pb="0" pt="2rem">
            <Box>
              <Box mb="0.5rem" display="flex">
                Imágenes de la publicación
                <CopyInternalCode
                  text="publicación"
                  internalCode={
                    post.internalCode ? post.internalCode : "CÓDIGO"
                  }
                />
              </Box>
            </Box>
          </ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} onClick={onClose} />
          <ModalBody pb="1.5rem">
            <Flex
              h="70vh"
              overflowY="scroll"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              {images.map((image) => (
                <Center key={image.url} flexGrow={1} w="33%" mb="1.5rem">
                  <Box
                    mt="0.5rem"
                    minW="270px"
                    maxW="270px"
                    minH="150px"
                    maxH="150px"
                    outline="2px solid #cacaca"
                    borderRadius="lg"
                    overflow="hidden"
                    position="relative"
                    _hover={{
                      transition: "transform .2s",
                      transform: "scale(0.98)",
                    }}
                  >
                    <FullscreenImageModal
                      minWidth="270px"
                      maxWidth="270px"
                      src={image.url}
                      alt={image.description}
                      description={image.description}
                      hover="yes"
                      text={`Imagen de la publicación ${post._id}`}
                    />
                  </Box>
                </Center>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostImagesList;
