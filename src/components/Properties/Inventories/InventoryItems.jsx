import React, { useEffect } from "react";
import {
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
  Button,
} from "@chakra-ui/react";
import { FaBoxes } from "react-icons/fa";
import CopyInternalCode from "../CopyInternalCode";

const InventoryItems = (props) => {
  const { itemsQuantity, inventory } = props;
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
            <Box fontSize="0.8rem" fontWeight="500">
              {itemsQuantity}
            </Box>
            <FaBoxes fontSize="1.2rem" />
          </HStack>
        </Tooltip>
        <Drawer size="xl" isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent
            borderLeft="1px white solid"
            borderStartStartRadius="7px"
            borderEndStartRadius="7px"
            bg="defaultColor.400"
          >
            <DrawerCloseButton color="#fff" mt="2" />
            <DrawerHeader color="#fff" borderBottomWidth="1px" mb="2">
              <Text display="flex">
                Objetos del inventario{" "}
                <CopyInternalCode
                  text="inventario"
                  internalCode={
                    inventory.internalCode ? inventory.internalCode : "CÓDIGO"
                  }
                />{" "}
              </Text>
            </DrawerHeader>
            <DrawerBody zIndex="0" color="#fff">
              <Box position="relative">
                <Box
                  display="flex"
                  bg="defaultColor.500"
                  p="3"
                  borderRadius="7px"
                  alignItems="center"
                  mb="5"
                >
                  <HStack w="100%" spacing="13px" height="25px">
                    <>
                      <Box w="30%" alignItems="center" textAlign="center">
                        <Text fontWeight="500">Nombre</Text>
                      </Box>
                      <Divider orientation="vertical" />
                      <Box w="50%" justifyContent="center" textAlign="center">
                        <Text fontWeight="500">Descripción</Text>
                      </Box>
                      <Divider orientation="vertical" />
                      <HStack
                        w="15%"
                        justifyContent="center"
                        textAlign="center"
                      >
                        <Text fontWeight="500">Cantidad</Text>
                      </HStack>
                    </>
                  </HStack>
                </Box>
              </Box>
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
                          <Box w="30%" alignItems="center" textAlign="center">
                            {item.name.length > 15 ? (
                              <Tooltip
                                hasArrow
                                label={item.name}
                                bg="defaultColor.500"
                              >
                                {
                                  <Box>
                                    {item.name.slice(0, 15).concat("...")}
                                  </Box>
                                }
                              </Tooltip>
                            ) : (
                              <Box>{item.name}</Box>
                            )}
                          </Box>
                          <Divider orientation="vertical" />
                          <Box
                            w="50%"
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
                                <Box>{item.description}</Box>
                              </Tooltip>
                            ) : (
                              <Box>{item.description}</Box>
                              /*{ <Text>{inventory.description}</Text> }*/
                            )}
                          </Box>
                          <Divider orientation="vertical" />
                          <HStack
                            w="15%"
                            justifyContent="center"
                            textAlign="center"
                          >
                            <Box>x{item.quantity}</Box>
                          </HStack>
                        </>
                      </HStack>
                    </Box>
                  </Box>
                ))
              )}
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="cancel-action" mr={0} onClick={onClose}>
                Cerrar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default InventoryItems;
