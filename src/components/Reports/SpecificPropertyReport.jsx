import React from "react";
import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Badge,
  Image,
  Tooltip,
  HStack,
} from "@chakra-ui/react";
import { MdLooksOne } from "react-icons/md";
import NoImage from "../../assets/no-image.jpg";
import { BsHouseDoorFill } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { MdApartment, MdCheck, MdClose, MdLocationPin } from "react-icons/md";
import BadgePropertyCard from "../Properties/Property/Card/BadgePropertyCard";
import CopyInternalCode from "../Properties/CopyInternalCode";
import PropertyDetails from "../Properties/Property/PropertyDetails";

const SpecificPropertyReport = (props) => {
  const { buttonText, modalTitle, property, topText } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatDate = () => {
    const newDate = new Date();
    return newDate.toLocaleDateString("en-GB");
  };

  const parsePropertyType = () => {
    if (property.type[0] === "Casa") {
      return <BadgePropertyCard title="Casa" icon={<BsHouseDoorFill />} />;
    } else if (property.type[0] === "Apartamento") {
      return <BadgePropertyCard title="Apartamento" icon={<MdApartment />} />;
    } else if (property.type[0] === "Depósito") {
      return <BadgePropertyCard title="Depósito" icon={<FaWarehouse />} />;
    }
  };

  return (
    <>
      <Button
        leftIcon={<MdLooksOne fontSize="1.2rem" />}
        onClick={onOpen}
        variant="reports-button"
        bg="defaultColor.400"
        color="#fff"
        minW="18rem"
        mt="0.5rem"
        mb="0.5rem"
        mr="1rem"
      >
        {buttonText}
      </Button>
      <Modal isCentered size="full" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pt="1.5rem" bg="defaultColor.400" color="#fff">
          <ModalHeader mb="-1rem">{modalTitle}</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <Box
              mt="0rem"
              w="100%"
              h="100%"
              textAlign="center"
              position="relative"
            >
              <Text
                position="absolute"
                right="0.2rem"
                top="-2rem"
                fontSize="1.1rem"
                fontWeight="500"
              >
                Hoy es {formatDate()}
              </Text>
              <Box
                borderRadius="7px"
                border="2px solid #fff"
                p="0.3rem"
                mb="1rem"
                h="85vh"
                display="flex"
                alignContent="center"
                justifyContent="center"
                alignItems="center"
              >
                <Box>
                  {topText && (
                    <Box
                      color="defaultColor.50"
                      fontWeight="500"
                      mt="-3rem"
                      w="100%"
                      position="absolute"
                      left="0"
                      display="flex"
                      justifyContent="center"
                    >
                      <Text maxW="50rem" fontSize="1.2rem">
                        {topText}
                      </Text>
                    </Box>
                  )}
                  <Box
                    minW="270px"
                    maxW="270px"
                    outline="2px solid #cacaca"
                    mt="2px"
                    borderRadius="lg"
                    overflow="hidden"
                    mb="4"
                    mr="4"
                    position="relative"
                  >
                    <PropertyDetails
                      propertyName={property.name}
                      property={property}
                    />
                    <Image
                      minW="270px"
                      maxW="270px"
                      minH="170px"
                      maxH="170px"
                      src={
                        property.media.length > 0
                          ? property.media[0].url
                          : NoImage
                      }
                      alt={property.imageAlt}
                      loading="lazy"
                      objectFit="cover"
                    />
                    <Box py="3" px="3">
                      <Box position="absolute" p="0" left="2" top="2">
                        {parsePropertyType()}
                      </Box>
                      <Box
                        color="defaultColor.100"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        display="flex"
                        alignItems="center"
                      >
                        <Box mr="1" fontSize="0.9rem" ml="-0.5" mt="-1px">
                          <MdLocationPin />
                        </Box>
                        {property.address.neighborhood.length > 15 ? (
                          <Tooltip
                            hasArrow
                            label={property.address.neighborhood}
                            bg="defaultColor.500"
                          >
                            <Box>
                              {property.address.neighborhood
                                .slice(0, 15)
                                .concat("...")}
                            </Box>
                          </Tooltip>
                        ) : (
                          <Box>{property.address.neighborhood}</Box>
                        )}
                        {","}
                        {property.address.city.length > 15 ? (
                          <Tooltip
                            hasArrow
                            label={property.address.city}
                            bg="defaultColor.500"
                          >
                            <Box>
                              {property.address.city.slice(0, 15).concat("...")}
                            </Box>
                          </Tooltip>
                        ) : (
                          <Box ml="1">{property.address.city}</Box>
                        )}
                      </Box>
                      <Box
                        mt="1"
                        mb="2.5"
                        fontWeight="semibold"
                        as="h4"
                        textAlign="left"
                        ml="0.2rem"
                        lineHeight="tight"
                      >
                        {property.description.length > 27 ? (
                          <Tooltip
                            hasArrow
                            label={property.description}
                            bg="defaultColor.500"
                          >
                            <Box>
                              {property.description.slice(0, 27).concat("...")}
                            </Box>
                          </Tooltip>
                        ) : (
                          <Box>{property.description}</Box>
                        )}
                      </Box>
                      <HStack spacing="4px" mt="2">
                        <Badge
                          borderRadius="7px"
                          alignItems="center"
                          display="flex"
                          px="2"
                          py="0.5"
                          bg="defaultColor.300"
                          color="#fff"
                        >
                          <CopyInternalCode
                            text="propiedad"
                            iconSize="0.9rem"
                            internalCode={
                              property.internalCode
                                ? property.internalCode
                                : "CÓDIGO"
                            }
                            noMarginLeft="true"
                          />
                        </Badge>
                        {property.isForSale ? (
                          <Badge
                            borderRadius="7px"
                            alignItems="center"
                            display="flex"
                            px="2"
                            py="0.5"
                            colorScheme="green"
                          >
                            <Box mr="1" fontSize="0.9rem">
                              <MdCheck />
                            </Box>
                            Venta
                          </Badge>
                        ) : (
                          <Badge
                            borderRadius="7px"
                            alignItems="center"
                            display="flex"
                            px="2"
                            py="0.5"
                            colorScheme="red"
                          >
                            <Box mr="1" fontSize="0.9rem">
                              <MdClose />
                            </Box>
                            Venta
                          </Badge>
                        )}
                        {property.isForRent ? (
                          <Badge
                            borderRadius="7px"
                            alignItems="center"
                            display="flex"
                            px="2"
                            py="0.5"
                            colorScheme="green"
                          >
                            <Box mr="1" fontSize="0.9rem">
                              <MdCheck />
                            </Box>
                            Alquiler
                          </Badge>
                        ) : (
                          <Badge
                            borderRadius="7px"
                            alignItems="center"
                            display="flex"
                            px="2"
                            py="0.5"
                            colorScheme="red"
                          >
                            <Box mr="1" fontSize="0.9rem">
                              <MdClose />
                            </Box>
                            Alquiler
                          </Badge>
                        )}
                      </HStack>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SpecificPropertyReport;
