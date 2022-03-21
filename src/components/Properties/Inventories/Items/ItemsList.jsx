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
import { FaBoxes, FaMobileAlt } from "react-icons/fa";
import CopyInternalCode from "../../CopyInternalCode";
import Notification from "../../../Other/Notification";

const ItemsList = (props) => {
  const { typeSingular, typePlural, itemsQuantity, typeObject } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const noItemsNotification = () => {
    Notification(
      `Este ${typeSingular} no tiene objetos`,
      "Deberás agregarlos mediante la app de celular",
      "warning"
    );
  };

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
            onClick={itemsQuantity == 0 ? () => noItemsNotification() : onOpen}
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
            <DrawerCloseButton
              _focus={{ boxShadow: "none" }}
              color="#fff"
              mt="2"
            />
            <DrawerHeader color="#fff" borderBottomWidth="1px" mb="2">
              <Text display="flex">
                Objetos del {typeSingular}{" "}
                <CopyInternalCode
                  text={typeSingular}
                  internalCode={
                    typeObject.internalCode ? typeObject.internalCode : "CÓDIGO"
                  }
                />
              </Text>
              <Tooltip
                hasArrow
                label="Ten en cuenta que esta sección se gestiona mayormente desde la app de celular"
                bg="defaultColor.500"
              >
                <Box
                  cursor="pointer"
                  position="absolute"
                  top="1.4rem"
                  right="3.5rem"
                  float="right"
                >
                  <FaMobileAlt />
                </Box>
              </Tooltip>
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
              {typeObject.items.map((item) => (
                <Box key={item._id} position="relative">
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
                        <Box w="30%" alignItems="center" textAlign="center">
                          {item.name.length > 25 ? (
                            <Tooltip
                              hasArrow
                              label={item.name}
                              bg="defaultColor.500"
                            >
                              {
                                <Box>
                                  {item.name.slice(0, 25).concat("...")}
                                </Box>
                              }
                            </Tooltip>
                          ) : (
                            <Box>{item.name}</Box>
                          )}
                        </Box>
                        <Divider orientation="vertical" />
                        <Box w="50%" justifyContent="center" textAlign="center">
                          {item.description.length > 40 ? (
                            <Tooltip
                              hasArrow
                              label={item.description}
                              bg="defaultColor.500"
                            >
                              <Box>
                                {" "}
                                {item.description.slice(0, 40).concat("...")}
                              </Box>
                            </Tooltip>
                          ) : (
                            <Box>{item.description}</Box>
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
              ))}
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

export default ItemsList;
