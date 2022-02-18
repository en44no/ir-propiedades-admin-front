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
  const { property } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const inventories = [
    {
      id: 1,
      status: "Closed",
      date: new Date(),
      description: "Un inventario",
    },
  ];

  useEffect(() => {
    if (isOpen) {
      //getFeaturesByProperty(property._id);
    }
  }, [isOpen]);

  return (
    <>
      <>
        {" "}
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
              150
            </Text>
            <FaBoxes fontSize="1.2rem" />
          </HStack>
        </Tooltip>
        <Drawer size="md" isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="defaultColor.400">
            <DrawerCloseButton color="#fff" mt="2" />
            <DrawerHeader color="#fff" borderBottomWidth="1px" mb="2">
              <Text display="flex">Objetos del inventario 4444</Text>
            </DrawerHeader>
            <DrawerBody zIndex="0" color="#fff">
              {inventories.length === 0 ? (
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
                inventories.map((inventory) => (
                  <Box position="relative">
                    <Box
                      key={inventory._id}
                      display="flex"
                      bg="defaultColor.300"
                      p="3"
                      borderRadius="7px"
                      alignItems="center"
                      mb="5"
                    >
                      <HStack w="100%" spacing="13px" height="25px">
                        <>
                          <FullscreenImageModal />
                          <Divider orientation="vertical" />
                          <Box
                            w="60%"
                            justifyContent="center"
                            textAlign="center"
                          >
                            {inventory.description.length > 24 ? (
                              <Tooltip
                                hasArrow
                                label={inventory.description}
                                bg="defaultColor.500"
                              >
                                {/* <Text>
                                  {inventory.description
                                    .slice(0, 24)
                                    .concat("...")}
                                </Text> */}
                                <Text>Manzana</Text>
                              </Tooltip>
                            ) : (
                              <Text>Manzana roja</Text>
                              /*{ <Text>{inventory.description}</Text> }*/
                            )}
                          </Box>
                          <Divider orientation="vertical" />
                          <HStack
                            w="15%"
                            justifyContent="center"
                            textAlign="center"
                          >
                            <Text>x13</Text>
                          </HStack>
                        </>
                      </HStack>
                    </Box>
                    <HStack
                      position="absolute"
                      bottom="-5px"
                      w="100%"
                      zIndex="-1"
                      borderRadius="5px"
                    >
                      <Box
                        cursor="pointer"
                        pt="1rem"
                        position="relative"
                        _hover={{ top: "20px" }}
                        bg="#cc5e5d"
                        w="50%"
                        borderRadius="5px"
                      >
                        <Text pb="0.2rem" textAlign="center" fontWeight="500">
                          Borrar
                        </Text>
                      </Box>
                      <Box
                        cursor="pointer"
                        pt="1rem"
                        position="relative"
                        _hover={{ top: "20px" }}
                        bg="#F0B955"
                        w="50%"
                        borderRadius="5px"
                      >
                        <Text pb="0.2rem" textAlign="center" fontWeight="500">
                          Editar
                        </Text>
                      </Box>
                    </HStack>
                  </Box>
                ))
              )}
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="cancel-action" mr={3} onClick={onClose}>
                Cerrar
              </Button>
              <CreateInventory
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

export default InventoryItems;
