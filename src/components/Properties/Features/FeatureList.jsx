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
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { MdStar } from "react-icons/md";
import CreateFeature from "./CreateFeature";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import CopyInternalCode from "../CopyInternalCode";
import ConfirmDelete from "../../Other/ConfirmDelete";
import EditFeature from "./EditFeature";

const FeatureList = (props) => {
  const { full, property } = props;
  const { properties, featuresProperty, deleteFeature } =
    useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const parseFeatureType = (feature) => {
    if (feature.type[0] === "Bathroom") {
      return "Baño";
    } else if (feature.type[0] === "Kitchen") {
      return "Cocina";
    } else if (feature.type[0] === "Bedroom") {
      return "Dormitorio";
    } else if (feature.type[0] === "Living Room") {
      return "Sala de estar";
    } else if (feature.type[0] === "Garage") {
      return "Garaje";
    } else if (feature.type[0] === "Other") {
      return "Otro";
    }
  };

  console.log(`featuresss ${properties.features}`);

  return (
    <>
      <>
        <Button
          id="createPosts"
          w={full === "yes" ? "100%" : "7rem"}
          onClick={onOpen}
          fontSize="15px"
          leftIcon={<MdStar fontSize="22px" />}
          mr={5}
          borderRadius="9px"
          variant="add-button-clear"
        >
          Gestionar características
        </Button>
        <Drawer size="xl" isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="defaultColor.400">
            <DrawerCloseButton color="#fff" mt="2" />
            <DrawerHeader color="#fff" borderBottomWidth="1px" mb="2">
              <Text display="flex">
                Características de la propiedad{" "}
                <CopyInternalCode
                  internalCode={
                    property.internalCode ? property.internalCode : "CÓDIGO"
                  }
                />
              </Text>
            </DrawerHeader>
            <DrawerBody zIndex="0" color="#fff">
              {property.features.length === 0 ? (
                <Text
                  fontSize="xl"
                  color="#EAE9ED"
                  display="flex"
                  h="100%"
                  w="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  Esta propiedad aún no cuenta con características.
                </Text>
              ) : (
                property.features.map((feature) => (
                  <Box key={feature._id} position="relative">
                    <Box
                      display="flex"
                      bg="defaultColor.300"
                      p="3"
                      borderRadius="7px"
                      alignItems="center"
                      mb="8"
                    >
                      <HStack w="100%" spacing="13px" height="25px">
                        <>
                          <Badge
                            w="25%"
                            borderRadius="7px"
                            px="1rem"
                            py="0.5"
                            fontSize="11px"
                            bgColor="defaultColor.400"
                            border="2px solid #fff"
                            color="#fff"
                          >
                            <Text textAlign="center">
                              {parseFeatureType(feature)}
                            </Text>
                          </Badge>
                          <Divider orientation="vertical" />
                          <Box
                            w="50%"
                            justifyContent="center"
                            textAlign="center"
                          >
                            {feature.title.length > 24 ? (
                              <Tooltip
                                hasArrow
                                label={feature.title}
                                bg="defaultColor.500"
                              >
                                <Text>
                                  {feature.title.slice(0, 24).concat("...")}
                                </Text>
                              </Tooltip>
                            ) : (
                              <Text>{feature.title}</Text>
                            )}
                          </Box>
                          <Divider orientation="vertical" />
                          <Box
                            w="100%"
                            justifyContent="center"
                            textAlign="center"
                          >
                            {feature.description.length > 50 ? (
                              <Tooltip
                                hasArrow
                                label={feature.description}
                                bg="defaultColor.500"
                              >
                                <Text>
                                  {feature.description
                                    .slice(0, 50)
                                    .concat("...")}
                                </Text>
                              </Tooltip>
                            ) : (
                              <Text>{feature.description}</Text>
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
                    >
                      <Box
                        cursor="pointer"
                        position="relative"
                        _hover={{ top: "20px" }}
                        bg="#cc5e5d"
                        w="50%"
                        borderRadius="5px"
                      >
                        <Text pb="0rem" textAlign="center" fontWeight="500">
                          <ConfirmDelete
                            text="¿Estás seguro de que deseas eliminar esta característica?"
                            name="característica"
                            onlyText="yes"
                            functionToExecute={deleteFeature}
                            element={feature}
                          />
                        </Text>
                      </Box>
                      <Box
                        cursor="pointer"
                        position="relative"
                        _hover={{ top: "20px" }}
                        bg="#F0B955"
                        w="50%"
                        borderRadius="5px"
                      >
                        <Text pb="0rem" textAlign="center" fontWeight="500">
                          <EditFeature feature={feature} property={property} />
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
              <CreateFeature
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

export default FeatureList;
