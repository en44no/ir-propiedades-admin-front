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
  HStack,
  Box,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import CreateInventory from "./CreateInventory";
import BadgeInventoryStatus from "./BadgeInventoryStatus";
import { FaBoxes } from "react-icons/fa";
import CopyInternalCode from "../CopyInternalCode";
import InventoryItems from "./InventoryItems";

const InventoriesList = (props) => {
  const { full, property } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };

  useEffect(() => {
    if (isOpen) {
      //getFeaturesByProperty(property._id);
    }
  }, [isOpen]);

  const parseInventoryStatus = (inventory) => {
    if (inventory.status[0] === "open" || inventory.status[0] === "Open") {
      return <BadgeInventoryStatus bgColor="#00b894" text="Abierto" />;
    } else if (
      inventory.status[0] === "closed" ||
      inventory.status[0] === "Closed"
    ) {
      return <BadgeInventoryStatus bgColor="#d63031" text="Cerrado" />;
    } else if (
      inventory.status[0] === "base" ||
      inventory.status[0] === "Base"
    ) {
      return <BadgeInventoryStatus bgColor="#cacaca" text="Base" />;
    }
  };

  return (
    <>
      <>
        <Button
          id="createPosts"
          w={full === "yes" ? "100%" : "7rem"}
          onClick={onOpen}
          fontSize="15px"
          leftIcon={<FaBoxes fontSize="22px" />}
          mr={5}
          borderRadius="9px"
          variant="add-button-clear"
        >
          Ver inventarios
        </Button>
        <Drawer size="xl" isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="defaultColor.400">
            <DrawerCloseButton color="#fff" mt="2" />
            <DrawerHeader color="#fff" borderBottomWidth="1px" mb="2">
              <Text display="flex">
                Inventarios de la propiedad{" "}
                <CopyInternalCode
                  internalCode={
                    property.internalCode ? property.internalCode : "CÓDIGO"
                  }
                />
              </Text>
            </DrawerHeader>
            <DrawerBody zIndex="0" color="#fff">
              {property.inventories.length === 0 ? (
                <Text
                  fontSize="xl"
                  color="#EAE9ED"
                  display="flex"
                  h="100%"
                  w="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  Esta propiedad aún no cuenta con inventarios.
                </Text>
              ) : (
                property.inventories.map((inventory) => (
                  <>
                    <Box key={inventory._id} position="relative">
                      <Box
                        display="flex"
                        bg="defaultColor.300"
                        p="3"
                        borderRadius="7px"
                        alignItems="center"
                        mb="5"
                      >
                        <HStack w="100%" spacing="13px" height="25px">
                          <>
                            <Box p="0" minW="10%" maxW="10%">
                              {parseInventoryStatus(inventory)}
                            </Box>
                            <Divider orientation="vertical" />
                            <Box
                              w="60%"
                              justifyContent="center"
                              textAlign="center"
                            >
                              {inventory.comments.length > 40 ? (
                                <Tooltip
                                  hasArrow
                                  label={inventory.comments}
                                  bg="defaultColor.500"
                                >
                                  <Text>
                                    {inventory.comments
                                      .slice(0, 40)
                                      .concat("...")}
                                  </Text>
                                </Tooltip>
                              ) : (
                                <Text>{inventory.comments}</Text>
                              )}
                            </Box>
                            <Divider orientation="vertical" />
                            <Box
                              w="20%"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Text>{formatDate(inventory.date)}</Text>
                            </Box>
                            <Divider orientation="vertical" />
                            <InventoryItems
                              property={property}
                              inventory={inventory}
                              itemsQuantity={inventory.items.length}
                            />
                          </>
                        </HStack>
                      </Box>
                      <HStack
                        position="absolute"
                        bottom="-5px"
                        w="100%"
                        zIndex="-1"
                        borderRadius="5px"
                      ></HStack>
                    </Box>
                  </>
                ))
              )}
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px"></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default InventoriesList;
