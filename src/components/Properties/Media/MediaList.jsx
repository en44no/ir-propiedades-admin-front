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
} from "@chakra-ui/react";
import { MdOutlineList } from "react-icons/md";
import PropertiesContext from "../../../context/PropertiesContext";
import CreateMedia from "./CreateMedia";

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
          w={full === "yes" ? "100%" : "8rem"}
          onClick={onOpen}
          fontSize="15px"
          leftIcon={<MdOutlineList fontSize="22px" />}
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
              Imágenes de la propiedad "{property.name}"
            </DrawerHeader>
            <DrawerBody color="#fff">{property.media.length}</DrawerBody>
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
