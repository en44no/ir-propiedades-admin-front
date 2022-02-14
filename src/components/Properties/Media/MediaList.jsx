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
} from "@chakra-ui/react";
import { BsImages } from "react-icons/bs";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import CreateMedia from "./CreateMedia";
import CopyInternalCode from "../CopyInternalCode";

const MediaList = (props) => {
  const { full, property } = props;
  const { getPostsByProperty, propertyPosts } = useContext(PropertiesContext);
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
          Ver imágenes
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
                <Text>Aca van las imagenes</Text>
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
