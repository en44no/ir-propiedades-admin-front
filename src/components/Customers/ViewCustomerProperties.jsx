import React from "react";
import {
  Badge,
  Box,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import PropertyCard from "../Properties/Property/Card/PropertyCard";
import { BsHouseDoorFill } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { MdApartment, MdCheck, MdClose, MdLocationPin } from "react-icons/md";
import { BsFillHouseDoorFill } from "react-icons/bs";
import BadgePropertyCard from "../Properties/Property/Card/BadgePropertyCard";
import PropertyDetails from "../Properties/Property/PropertyDetails";
import CopyInternalCode from "../Properties/CopyInternalCode";
import NoImage from "../../assets/no-image.jpg";
import CustomersContext from "../../context/Customers/CustomersContext";

const ViewCustomerProperties = (props) => {
  const { ownerProperties, tenantProperties, customer } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const parsePropertyType = (property) => {
    if (property.type[0] === "Casa") {
      return (
        <BadgePropertyCard
          bgColor="defaultColor.500"
          title="Casa"
          icon={<BsHouseDoorFill />}
        />
      );
    } else if (property.type[0] === "Apartamento") {
      return (
        <BadgePropertyCard
          bgColor="defaultColor.500"
          title="Apartamento"
          icon={<MdApartment />}
        />
      );
    } else if (property.type[0] === "Depósito") {
      return (
        <BadgePropertyCard
          bgColor="defaultColor.500"
          title="Depósito"
          icon={<FaWarehouse />}
        />
      );
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Badge
          fontSize="0.7rem"
          fontWeight="bold"
          color="white"
          bgColor="defaultColor.400"
          boxShadow="base"
          borderRadius="15px"
          px={2}
          py={1}
          display="flex"
          onClick={onOpen}
          cursor="pointer"
        >
          <BsFillHouseDoorFill fontSize="15px" />
          <Text ml="0.5rem">Ver propiedades</Text>
        </Badge>
      </Box>
      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay alignItems="center" h="100vh !important" />
        <ModalContent bg="defaultColor.400" color="#fff">
          <ModalHeader fontSize="1.1rem" mb="0" pb="0" pt="0.7rem">
            <Box>
              <Box>Propiedades de {customer.name}</Box>
            </Box>
          </ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} onClick={onClose} />
          <ModalBody pb="1.5rem">
            <Box
              className="allProperties"
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              mt="0rem"
              overflowY="auto"
              height="90%"
            >
              {ownerProperties &&
                ownerProperties.map((property) => (
                  <Box key={property._id}>
                    <Box
                      minW="270px"
                      maxW="270px"
                      outline="2px solid #cacaca"
                      mt="2rem"
                      borderRadius="lg"
                      overflow="hidden"
                      mb="9"
                      mr="4"
                      position="relative"
                    >
                      {property.media.length > 0 ? (
                        property.media.map((media) => (
                          <Image
                            minW="270px"
                            maxW="270px"
                            minH="170px"
                            maxH="170px"
                            src={media.url}
                            alt={media.description}
                            loading="lazy"
                            objectFit="cover"
                          />
                        ))
                      ) : (
                        <Image
                          minW="270px"
                          maxW="270px"
                          minH="170px"
                          maxH="170px"
                          src={NoImage}
                          loading="lazy"
                          objectFit="cover"
                        />
                      )}
                      <Box py="3" px="3">
                        <Box position="absolute" p="0" right="2" top="2">
                          <Badge
                            borderRadius="7px"
                            alignItems="center"
                            display="flex"
                            px="2"
                            py="0.5"
                            bgColor="defaultColor.500"
                            color="#fff"
                          >
                            Dueño
                          </Badge>
                        </Box>

                        <Box py="3" px="3">
                          <Box position="absolute" p="0" left="2" top="2">
                            <Badge
                              borderRadius="7px"
                              alignItems="center"
                              display="flex"
                              px="2"
                              py="0.5"
                              bgColor="defaultColor.500"
                              color="#fff"
                            >
                              {property.type}
                            </Badge>
                          </Box>
                        </Box>

                        <HStack spacing="10px" mt="-1.3rem">
                          <Badge
                            borderRadius="7px"
                            alignItems="center"
                            display="flex"
                            px="2"
                            py="0.5"
                            bgColor="defaultColor.500"
                            color="#fff"
                          >
                            <CopyInternalCode
                              text="propiedad"
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
                ))}
              {tenantProperties &&
                tenantProperties.map((property) => (
                  <Box key={property._id}>
                    <Box
                      minW="270px"
                      maxW="270px"
                      outline="2px solid #cacaca"
                      mt="2rem"
                      borderRadius="lg"
                      overflow="hidden"
                      mb="4"
                      mr="4"
                      position="relative"
                    >
                      {property.media.length > 0 ? (
                        property.media.map((media) => (
                          <Image
                            minW="270px"
                            maxW="270px"
                            minH="170px"
                            maxH="170px"
                            src={media.url}
                            alt={media.description}
                            loading="lazy"
                            objectFit="cover"
                          />
                        ))
                      ) : (
                        <Image
                          minW="270px"
                          maxW="270px"
                          minH="170px"
                          maxH="170px"
                          src={NoImage}
                          loading="lazy"
                          objectFit="cover"
                        />
                      )}

                      <Box py="3" px="3">
                        <Box position="absolute" p="0" left="2" top="2">
                          <Badge
                            borderRadius="7px"
                            alignItems="center"
                            display="flex"
                            px="2"
                            py="0.5"
                            bgColor="defaultColor.500"
                            color="#fff"
                          >
                            Inquilino
                          </Badge>
                        </Box>

                        <HStack spacing="10px" mt="2">
                          <Badge
                            borderRadius="7px"
                            alignItems="center"
                            display="flex"
                            px="2"
                            py="0.5"
                            bgColor="defaultColor.500"
                            color="#fff"
                          >
                            <CopyInternalCode
                              text="propiedad"
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
                ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewCustomerProperties;
