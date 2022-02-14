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
  HStack,
  Box,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import CreateInventory from "./CreateInventory";
import BadgeInventoryStatus from "./BadgeInventoryStatus";
import { BsImages } from "react-icons/bs";
import { FaBoxes } from "react-icons/fa";
import CopyInternalCode from "../CopyInternalCode";

const InventoriesList = (props) => {
  const { full, property } = props;
  const {} = useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const inventories = [
    {
      id: 1,
      status: "Closed",
      date: new Date(),
      description: "Un inventario",
    },
  ];

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
    if (inventory.status === "Open") {
      return <BadgeInventoryStatus bgColor="#00b894" text="Abierto" />;
    } else if (inventory.status === "Closed") {
      return <BadgeInventoryStatus bgColor="#d63031" text="Cerrado" />;
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
                  Esta propiedad aún no cuenta con inventarios.
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
                          <Box p="0" minW="10%" maxW="10%">
                            {parseInventoryStatus(inventory)}
                          </Box>
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
                                <Text>
                                  {inventory.description
                                    .slice(0, 24)
                                    .concat("...")}
                                </Text>
                              </Tooltip>
                            ) : (
                              <Text>{inventory.description}</Text>
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
                          <HStack spacing="10px">
                            <Tooltip
                              hasArrow
                              label="Ver imágenes"
                              bg="defaultColor.500"
                            >
                              <HStack
                                cursor="pointer"
                                px="3"
                                py="1.5"
                                bg="defaultColor.400"
                                borderRadius="7px"
                                alignItems="center"
                              >
                                <Text fontSize="0.8rem" fontWeight="500">
                                  150
                                </Text>
                                <BsImages fontSize="1.2rem" />
                              </HStack>
                            </Tooltip>
                            <Tooltip
                              hasArrow
                              label="Ver objetos"
                              bg="defaultColor.500"
                            >
                              <HStack
                                cursor="pointer"
                                px="3"
                                py="1.5"
                                bg="defaultColor.400"
                                borderRadius="7px"
                                alignItems="center"
                              >
                                <Text fontSize="0.8rem" fontWeight="500">
                                  150
                                </Text>
                                <FaBoxes fontSize="1.2rem" />
                              </HStack>
                            </Tooltip>
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

export default InventoriesList;
