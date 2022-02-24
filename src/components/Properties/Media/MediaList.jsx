import React, { useContext, useEffect } from "react";
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
  SimpleGrid,
} from "@chakra-ui/react";
import { BsImages } from "react-icons/bs";
import CreateMedia from "./CreateMedia";
import CopyInternalCode from "../CopyInternalCode";
import FullscreenImageModal from "../../Other/FullscreenImageModal";
import ConfirmDelete from "../../Other/ConfirmDelete";
import PropertiesContext from "../../../context/Properties/PropertiesContext";

const MediaList = (props) => {
  const { full, property } = props;
  const { deleteMedia } = useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
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
                      <Box
                        bg="defaultColor.400"
                        borderRadius="50%"
                        position="absolute"
                        p="0"
                        minW="1.7rem"
                        minH="1.7rem"
                        h="1.7rem"
                        w="1.7rem"
                        top="2"
                        right="2"
                        cursor="pointer"
                        _hover={{
                          transition: "transform .2s",
                          transform: "scale(0.96)",
                        }}
                      >
                        <ConfirmDelete
                          text="¿Estás seguro de que deseas eliminar esta imagen?"
                          name="imagen"
                          functionToExecute={deleteMedia}
                          element={property}
                          anotherElement={image}
                          onlyIcon="true"
                        />
                      </Box>
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
