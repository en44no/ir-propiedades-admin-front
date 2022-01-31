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
import { MdOutlineList } from "react-icons/md";
import CreateFeature from "./CreateFeature";
import PropertiesContext from "../../../context/PropertiesContext";

const FeatureList = (props) => {
  const { full, property } = props;
  const { getFeaturesByProperty, featuresProperty } =
    useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      getFeaturesByProperty(property._id);
    }
  }, [isOpen]);

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

  return (
    <>
      <>
        <Button
          id="createPosts"
          w={full === "yes" ? "100%" : "8rem"}
          onClick={onOpen}
          fontSize="15px"
          leftIcon={<MdOutlineList fontSize="22px" />}
          mr={5}
          borderRadius="9px"
          variant="add-button-clear"
        >
          Ver características
        </Button>
        <Drawer size="xl" isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="defaultColor.400">
            <DrawerCloseButton color="#fff" mt="2" />
            <DrawerHeader color="#fff" borderBottomWidth="1px" mb="2">
              Características de la propiedad "{property.name}"
            </DrawerHeader>
            <DrawerBody color="#fff">
              {featuresProperty &&
                featuresProperty.map((feature) => (
                  <Box
                    key={feature._id}
                    display="flex"
                    bg="defaultColor.300"
                    p="3"
                    borderRadius="7px"
                    alignItems="center"
                    mb="5"
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
                        <Box w="50%" justifyContent="center" textAlign="center">
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
                                {feature.description.slice(0, 50).concat("...")}
                              </Text>
                            </Tooltip>
                          ) : (
                            <Text>{feature.description}</Text>
                          )}
                        </Box>
                      </>
                    </HStack>
                  </Box>
                ))}
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
