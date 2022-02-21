import React, { useEffect } from "react";
import {
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Text,
  Box,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { BsImages } from "react-icons/bs";
import CreateMedia from "./CreateMedia";
import CopyInternalCode from "../CopyInternalCode";
import FullscreenImageModal from "../../Other/FullscreenImageModal";

const MediaList = (props) => {
  const { full, property } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log(property.media);
    if (isOpen) {
      //getPostsByProperty(property._id);
    }
  }, [isOpen]);

  return (
    <>
      <>
        <Button
          id="viewImages"
          w={full === "yes" ? "100%" : "7rem"}
          onClick={onOpen}
          fontSize="15px"
          leftIcon={<BsImages fontSize="20px" />}
          mr={5}
          borderRadius="9px"
          variant="add-button-clear"
        >
          Gestionar imágenes
        </Button>
        <Drawer size="xl" isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="defaultColor.400">
            <DrawerCloseButton color="#fff" mt="2" />
            <DrawerHeader color="#fff" borderBottomWidth="1px" mb="2">
              <Text display="flex">
                Imágenes de la propiedad{" "}
                <CopyInternalCode
                  internalCode={
                    property.internalCode ? property.internalCode : "CÓDIGO"
                  }
                />
              </Text>
            </DrawerHeader>
            <DrawerBody color="#fff">
              {property.media.length === 0 ? (
                <Text
                  fontSize="xl"
                  color="#EAE9ED"
                  display="flex"
                  h="100%"
                  w="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  Esta propiedad aún no cuenta con imágenes.
                </Text>
              ) : (
                <SimpleGrid columns={[2, null, 3]} spacing="40px">
                  {property.media.map((image) => (
                    <Box
                      key={image._id}
                      minW="270px"
                      maxW="270px"
                      outline="2px solid #cacaca"
                      borderRadius="lg"
                      overflow="hidden"
                      mb="-0.7rem"
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
                        hover="yes"
                        text={`Imagen de la propiedad "${image.description}"`}
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              )}
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="cancel-action" mr={3} onClick={onClose}>
                Cerrar
              </Button>
              <CreateMedia
                property={property}
                normalAddButton="yes"
                noRightMargin
              />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default MediaList;
