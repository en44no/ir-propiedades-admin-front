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
  GridItem,
  Grid,
  Badge,
} from "@chakra-ui/react";
import { FaBoxes, FaMobileAlt } from "react-icons/fa";
import CopyInternalCode from "../../CopyInternalCode";
import Notification from "../../../Other/Notification";

const ItemsCompareList = (props) => {
  const {
    typeSingular,
    typePlural,
    itemsQuantity,
    typeObject,
    typeObjectToCompare,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      //getFeaturesByProperty(property._id);
    }
  }, [isOpen]);

  const noItemsNotification = () => {
    Notification(
      `Este ${typeSingular} no tiene objetos`,
      "Deberás agregarlos mediante la app de celular",
      "warning"
    );
  };

  const getDiferencia = (object, objectToCompare) => {
    if (
      object.name == objectToCompare.name &&
      object.description == objectToCompare.description
    ) {
      return (
        <Box
          display="flex"
          bg="defaultColor.300"
          p="3"
          borderRadius="7px"
          alignItems="center"
          mb="5"
          h="3.063rem"
        >
          <HStack w="100%" justifyContent="center" textAlign="center">
            {object.quantity - objectToCompare.quantity <= -1 && (
              <Badge
                minW="50%"
                maxW="50%"
                borderRadius="7px"
                px="0"
                py="0.5"
                fontSize="1rem"
                bg="defaultColor.400"
                border="#d63031 2px solid"
                color={"#fff"}
              >
                {object.quantity - objectToCompare.quantity}
              </Badge>
            )}
            {object.quantity - objectToCompare.quantity == 0 && (
              <Badge
                minW="50%"
                maxW="50%"
                borderRadius="7px"
                px="0"
                py="0.5"
                fontSize="1rem"
                bg="defaultColor.400"
                border="#cacaca 2px solid"
                color={"#fff"}
              >
                {object.quantity - objectToCompare.quantity}
              </Badge>
            )}

            {object.quantity - objectToCompare.quantity >= 1 && (
              <Badge
                minW="50%"
                maxW="50%"
                borderRadius="7px"
                px="0"
                py="0.5"
                fontSize="1rem"
                bg="defaultColor.400"
                border="#fdcb6e 2px solid"
                color={"#fff"}
              >
                +{object.quantity - objectToCompare.quantity}
              </Badge>
            )}
          </HStack>
        </Box>
      );
    }
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
        <Drawer size="full" isOpen={isOpen} placement="right" onClose={onClose}>
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
              <Box display="flex">
                Comparación de objetos del {typeSingular}
                <CopyInternalCode
                  text={typeSingular}
                  internalCode={
                    typeObject.internalCode ? typeObject.internalCode : "CÓDIGO"
                  }
                />
              </Box>
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
              <Box mb="1rem">
                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                  <GridItem colSpan={5} w="100%">
                    <Box
                      position="relative"
                      fontSize="1.3rem"
                      fontWeight="500"
                      textAlign="center"
                      mb="0.7rem"
                    >
                      <Box
                        fontSize="1.2rem"
                        display="flex"
                        justifyContent="center"
                      >
                        Objetos del {typeSingular}
                        <CopyInternalCode
                          text={typeSingular}
                          internalCode={
                            typeObject.internalCode
                              ? typeObject.internalCode
                              : "CÓDIGO"
                          }
                        />
                      </Box>
                    </Box>
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
                            <Box
                              w="50%"
                              justifyContent="center"
                              textAlign="center"
                            >
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
                              <Box
                                w="30%"
                                alignItems="center"
                                textAlign="center"
                              >
                                {item.name.length > 18 ? (
                                  <Tooltip
                                    hasArrow
                                    label={item.name}
                                    bg="defaultColor.500"
                                  >
                                    {
                                      <Box>
                                        {item.name.slice(0, 18).concat("...")}
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
                                {item.description.length > 32 ? (
                                  <Tooltip
                                    hasArrow
                                    label={item.description}
                                    bg="defaultColor.500"
                                  >
                                    <Box>
                                      {" "}
                                      {item.description
                                        .slice(0, 32)
                                        .concat("...")}
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
                  </GridItem>
                  <GridItem colSpan={5} w="100%">
                    <Box
                      position="relative"
                      fontSize="1.3rem"
                      fontWeight="500"
                      textAlign="center"
                      mb="0.7rem"
                    >
                      <Box
                        fontSize="1.2rem"
                        display="flex"
                        justifyContent="center"
                      >
                        Objetos del inventario
                        <CopyInternalCode
                          text="inventario"
                          internalCode={
                            typeObjectToCompare.internalCode
                              ? typeObjectToCompare.internalCode
                              : "CÓDIGO"
                          }
                        />
                      </Box>
                    </Box>
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
                            <Box
                              w="50%"
                              justifyContent="center"
                              textAlign="center"
                            >
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
                    {typeObjectToCompare.items.map((item) => (
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
                              <Box
                                w="30%"
                                alignItems="center"
                                textAlign="center"
                              >
                                {item.name.length > 18 ? (
                                  <Tooltip
                                    hasArrow
                                    label={item.name}
                                    bg="defaultColor.500"
                                  >
                                    {
                                      <Box>
                                        {item.name.slice(0, 18).concat("...")}
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
                                {item.description.length > 32 ? (
                                  <Tooltip
                                    hasArrow
                                    label={item.description}
                                    bg="defaultColor.500"
                                  >
                                    <Box>
                                      {" "}
                                      {item.description
                                        .slice(0, 32)
                                        .concat("...")}
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
                  </GridItem>
                  <GridItem colSpan={2} w="100%">
                    <Box
                      position="relative"
                      fontSize="1.3rem"
                      fontWeight="500"
                      textAlign="center"
                      mb="0.7rem"
                    >
                      <Box
                        fontSize="1.2rem"
                        display="flex"
                        justifyContent="center"
                      >
                        Diferencias
                      </Box>
                    </Box>
                    <Box position="relative">
                      <Box
                        display="flex"
                        bg="defaultColor.500"
                        p="3"
                        borderRadius="7px"
                        alignItems="center"
                        mb="5"
                        h="3.063rem"
                      >
                        <HStack
                          w="100%"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text fontWeight="500">Cantidad</Text>
                        </HStack>
                      </Box>
                    </Box>
                    {typeObjectToCompare.items.map((typeObjectToCompareItem) =>
                      typeObject.items.map((typeObjectItem) => (
                        <Box
                          key={typeObjectToCompareItem._id}
                          position="relative"
                        >
                          <Box>
                            {getDiferencia(
                              typeObjectItem,
                              typeObjectToCompareItem
                            )}
                          </Box>
                        </Box>
                      ))
                    )}
                  </GridItem>
                </Grid>
              </Box>
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

export default ItemsCompareList;
