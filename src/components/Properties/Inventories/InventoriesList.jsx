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
import BadgeInventoryStatus from "./BadgeInventoryStatus";
import { FaBoxes, FaCheck } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import CopyInternalCode from "../CopyInternalCode";
import InventoryItems from "./InventoryItems";
import PropertiesContext from "../../../context/Properties/PropertiesContext";

const InventoriesList = (props) => {
  const { full, property } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { changeInventoryStatus } = useContext(PropertiesContext);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };

  const parseInventoryStatus = (inventory) => {
    if (inventory.status[0] === "Abierto") {
      return <BadgeInventoryStatus bgColor="#00b894" text="Abierto" />;
    } else if (inventory.status[0] === "Cerrado") {
      return <BadgeInventoryStatus bgColor="#d63031" text="Cerrado" />;
    } else if (inventory.status[0] === "Base") {
      return <BadgeInventoryStatus bgColor="#cacaca" text="Base" />;
    } else if (inventory.status[0] === "Finalizado") {
      return <BadgeInventoryStatus bgColor="#0984e3" text="Finalizado" />;
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
          Gestionar inventarios
        </Button>
        <Drawer size="full" isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="defaultColor.400">
            <DrawerCloseButton color="#fff" mt="2" />
            <DrawerHeader color="#fff" borderBottomWidth="1px" mb="2">
              <Text display="flex">
                Inventarios de la propiedad{" "}
                <CopyInternalCode
                  text="propiedad"
                  internalCode={
                    property.internalCode ? property.internalCode : "CÓDIGO"
                  }
                />
              </Text>
            </DrawerHeader>
            <DrawerBody zIndex="0" color="#fff">
              {property.inventories.length !== 0 && (
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
                      <Box
                        p="0"
                        w="10%"
                        justifyContent="center"
                        textAlign="center"
                      >
                        <Box fontWeight="500">Estado</Box>
                      </Box>
                      <Divider orientation="vertical" />
                      <Box w="10%" justifyContent="center" textAlign="center">
                        <Text fontWeight="500">Código Interno</Text>
                      </Box>
                      <Divider orientation="vertical" />
                      <Box w="55%" justifyContent="center" textAlign="center">
                        <Text fontWeight="500">Comentario</Text>
                      </Box>
                      <Divider orientation="vertical" />
                      <Box w="15%" justifyContent="center" textAlign="center">
                        <Text fontWeight="500">Fecha</Text>
                      </Box>
                      <Divider orientation="vertical" />
                      <Box w="10%" justifyContent="center" textAlign="center">
                        <Text fontWeight="500">Acciones</Text>
                      </Box>
                    </>
                  </HStack>
                </Box>
              )}
              <Box position="relative">
                <HStack
                  position="absolute"
                  bottom="-5px"
                  w="100%"
                  zIndex="-1"
                  borderRadius="5px"
                ></HStack>
              </Box>
              {property.inventories.length === 0 ? (
                <Text
                  fontSize="xl"
                  color="#EAE9ED"
                  display="flex"
                  h="100%"
                  w="100%"
                  justifyContent="center"
                  alignItems="center"
                  mt="-0.5rem"
                >
                  Esta propiedad aún no cuenta con inventarios.
                </Text>
              ) : (
                property.inventories.map((inventory) => (
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
                          <Box p="0" w="10%">
                            {parseInventoryStatus(inventory)}
                          </Box>
                          <Divider orientation="vertical" />
                          <Box
                            w="10%"
                            justifyContent="center"
                            textAlign="center"
                          >
                            <Box>{inventory.internalCode}</Box>
                          </Box>
                          <Divider orientation="vertical" />
                          <Box
                            w="55%"
                            justifyContent="center"
                            textAlign="center"
                          >
                            {inventory.comments.length > 40 ? (
                              <Tooltip
                                hasArrow
                                label={inventory.comments}
                                bg="defaultColor.500"
                              >
                                <Box>
                                  {inventory.comments
                                    .slice(0, 40)
                                    .concat("...")}
                                </Box>
                              </Tooltip>
                            ) : (
                              <Box>{inventory.comments}</Box>
                            )}
                          </Box>
                          <Divider orientation="vertical" />
                          <Box
                            w="15%"
                            justifyContent="center"
                            textAlign="center"
                          >
                            <Box>{formatDate(inventory.date)}</Box>
                          </Box>
                          <Divider orientation="vertical" />
                          <Box
                            w="10%"
                            gap="10px"
                            display="flex"
                            justifyContent="center"
                          >
                            <InventoryItems
                              property={property}
                              inventory={inventory}
                              itemsQuantity={inventory.items.length}
                            />
                            {inventory.status[0] === "Abierto" && (
                              <Tooltip
                                hasArrow
                                label="Cerrar inventario"
                                bg="defaultColor.500"
                              >
                                <HStack
                                  cursor="pointer"
                                  px="3"
                                  py="1.5"
                                  bg="defaultColor.400"
                                  borderRadius="7px"
                                  alignItems="center"
                                  onClick={() => {
                                    changeInventoryStatus(
                                      "Cerrado",
                                      inventory._id
                                    );
                                  }}
                                >
                                  <GiPadlock fontSize="1.2rem" />
                                </HStack>
                              </Tooltip>
                            )}
                            {inventory.status[0] === "Cerrado" && (
                              <Tooltip
                                hasArrow
                                label="Finalizar inventario"
                                bg="defaultColor.500"
                              >
                                <HStack
                                  cursor="pointer"
                                  px="3"
                                  py="1.5"
                                  bg="defaultColor.400"
                                  borderRadius="7px"
                                  alignItems="center"
                                  onClick={() => {
                                    changeInventoryStatus(
                                      "Finalizado",
                                      inventory._id
                                    );
                                  }}
                                >
                                  <FaCheck fontSize="1rem" />
                                </HStack>
                              </Tooltip>
                            )}
                          </Box>
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
                ))
              )}
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="cancel-action" mr={2} onClick={onClose}>
                Cerrar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default InventoriesList;
