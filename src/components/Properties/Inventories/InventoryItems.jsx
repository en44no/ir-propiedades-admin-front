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
import { FaBoxes } from "react-icons/fa";
import FullscreenImageModal from "../../Other/FullscreenImageModal";

const InventoryItems = (props) => {
  const { property, itemsQuantity, inventory } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      //getFeaturesByProperty(property._id);
    }
  }, [isOpen]);

  return (
    <>
      <>
        <Tooltip hasArrow label="Ver objetos" bg="defaultColor.500">
          <HStack
            cursor="pointer"
            px="3"
            py="1.5"
            bg="defaultColor.400"
            borderRadius="7px"
            alignItems="center"
            onClick={onOpen}
          >
            <Text fontSize="0.8rem" fontWeight="500">
              {itemsQuantity}
            </Text>
            <FaBoxes fontSize="1.2rem" />
          </HStack>
        </Tooltip>
        <Drawer size="md" isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="defaultColor.400">
            <DrawerCloseButton color="#fff" mt="2" />
            <DrawerHeader color="#fff" borderBottomWidth="1px" mb="2">
              <Text display="flex">Objetos del inventario</Text>
            </DrawerHeader>
            <DrawerBody zIndex="0" color="#fff">
              {inventory.items.length === 0 ? (
                <Text
                  fontSize="xl"
                  color="#EAE9ED"
                  display="flex"
                  h="100%"
                  w="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  Este inventario aún no cuenta con objetos.
                </Text>
              ) : (
                inventory.items.map((item) => (
                  <Box position="relative">
                    <Box
                      key={item._id}
                      display="flex"
                      bg="defaultColor.300"
                      p="3"
                      borderRadius="7px"
                      alignItems="center"
                      mb="5"
                    >
                      <HStack w="100%" spacing="13px" height="25px">
                        <>
                          <Box w="20%" alignItems="center" textAlign="center">
                            {item.name.length > 8 ? (
                              <Tooltip
                                hasArrow
                                label={item.name}
                                bg="defaultColor.500"
                              >
                                {
                                  <Text>
                                    {item.name.slice(0, 8).concat("...")}
                                  </Text>
                                }
                              </Tooltip>
                            ) : (
                              <Text>{item.name}</Text>
                            )}
                          </Box>
                          <Divider orientation="vertical" />
                          <Box
                            w="60%"
                            justifyContent="center"
                            textAlign="center"
                          >
                            {item.description.length > 24 ? (
                              <Tooltip
                                hasArrow
                                label={item.description}
                                bg="defaultColor.500"
                              >
                                {/* <Text>
                                  {inventory.description
                                    .slice(0, 24)
                                    .concat("...")}
                                </Text> */}
                                <Text>{item.description}</Text>
                              </Tooltip>
                            ) : (
                              <Text>{item.description}</Text>
                              /*{ <Text>{inventory.description}</Text> }*/
                            )}
                          </Box>
                          <Divider orientation="vertical" />
                          <HStack
                            w="15%"
                            justifyContent="center"
                            textAlign="center"
                          >
                            <Text>x{item.quantity}</Text>
                          </HStack>
                        </>
                      </HStack>
                    </Box>
                  </Box>
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

export default InventoryItems;
