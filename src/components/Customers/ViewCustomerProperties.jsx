import React from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BsHouseDoorFill } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { BsFillHouseDoorFill } from "react-icons/bs";
import BadgePropertyCard from "../Properties/Property/Card/BadgePropertyCard";
import CopyInternalCode from "../Properties/CopyInternalCode";

const ViewCustomerProperties = (props) => {
  const { customer, reportButton } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const parsePropertyType = (propertyType) => {
    if (propertyType[0] === "Casa") {
      return (
        <BadgePropertyCard
          bgColor="defaultColor.500"
          title="Casa"
          icon={<BsHouseDoorFill />}
        />
      );
    } else if (propertyType[0] === "Apartamento") {
      return (
        <BadgePropertyCard
          bgColor="defaultColor.500"
          title="Apartamento"
          icon={<MdApartment />}
        />
      );
    } else if (propertyType[0] === "Depósito") {
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
        {reportButton ? (
          <Button
            mt="0.8rem"
            w="100%"
            fontSize="0.8rem"
            fontWeight="bold"
            textTransform="uppercase"
            justifyContent="center"
            borderRadius="7px"
            bg="defaultColor.500"
            color="#fff"
            display="flex"
            alignItems="center"
            onClick={onOpen}
            variant="reports-button"
          >
            <BsFillHouseDoorFill fontSize="15px" />
            <Text ml="0.5rem">Ver propiedades</Text>
          </Button>
        ) : (
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
        )}
      </Box>
      <Modal
        size="5xl"
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
            <Box position="relative">
              <Box
                display="flex"
                bg="defaultColor.500"
                p="3"
                borderRadius="7px"
                alignItems="center"
                mb="4"
              >
                <HStack w="100%" spacing="13px" height="25px">
                  <>
                    <Box w="12%" px="1rem" py="0.5" textAlign="center">
                      <Text fontWeight="500">C. Interno</Text>
                    </Box>
                    <Divider orientation="vertical" />
                    <Box w="10%" px="1rem" py="0.5" textAlign="center">
                      <Text fontWeight="500">Tipo</Text>
                    </Box>
                    <Divider orientation="vertical" />
                    <Box w="20%" px="1rem" py="0.5" textAlign="center">
                      <Text fontWeight="500">Nombre</Text>
                    </Box>
                    <Divider orientation="vertical" />
                    <Box w="43%" px="1rem" py="0.5" textAlign="center">
                      <Text fontWeight="500">Descripción</Text>
                    </Box>
                    <Divider orientation="vertical" />
                    <Box w="10%" px="1rem" py="0.5" textAlign="center">
                      <Text fontWeight="500">Vínculo</Text>
                    </Box>
                  </>
                </HStack>
              </Box>
              {customer.ownerProperties.length > 0 &&
                customer.ownerProperties.map((property) => (
                  <Box
                    key={property._id}
                    display="flex"
                    bg="defaultColor.300"
                    p="3"
                    borderRadius="7px"
                    alignItems="center"
                    mb="4"
                  >
                    <HStack w="100%" spacing="13px" height="25px">
                      <>
                        <Box w="12%" px="1rem" py="0.5" textAlign="center">
                          <CopyInternalCode
                            text="propiedad"
                            internalCode={
                              property.internalCode
                                ? property.internalCode
                                : "CÓDIGO"
                            }
                          />
                        </Box>
                        <Divider orientation="vertical" />
                        <Box w="10%" px="0rem" py="0.5" textAlign="center">
                          <Box>{parsePropertyType(property.type)}</Box>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box w="20%" px="1rem" py="0.5" textAlign="center">
                          <Box>{property.name}</Box>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box w="43%" px="1rem" py="0.5" textAlign="center">
                          <Box>{property.description}</Box>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box w="10%" px="0.5rem" py="0.5" textAlign="center">
                          <Box>
                            <Badge
                              w="auto"
                              justifyContent="center"
                              borderRadius="7px"
                              ml="-0.5"
                              px="2"
                              py="0.5"
                              bg="defaultColor.500"
                              color="#fff"
                              display="flex"
                              alignItems="center"
                            >
                              Dueño
                            </Badge>
                          </Box>
                        </Box>
                        {/* <Box w="10%" px="1rem" py="0.5" textAlign="center">
                          <PropertyDetails
                            propertyName={property.name}
                            property={property}
                          />
                        </Box> */}
                      </>
                    </HStack>
                  </Box>
                ))}
              {customer.tenantProperties.length > 0 &&
                customer.tenantProperties.map((property) => (
                  <Box
                    key={property._id}
                    display="flex"
                    bg="defaultColor.300"
                    p="3"
                    borderRadius="7px"
                    alignItems="center"
                    mb="4"
                  >
                    <HStack w="100%" spacing="13px" height="25px">
                      <>
                        <Box w="12%" px="1rem" py="0.5" textAlign="center">
                          <CopyInternalCode
                            text="propiedad"
                            internalCode={
                              property.internalCode
                                ? property.internalCode
                                : "CÓDIGO"
                            }
                          />
                        </Box>
                        <Divider orientation="vertical" />
                        <Box w="10%" px="0rem" py="0.5" textAlign="center">
                          <Box fontWeight="500">
                            {parsePropertyType(property.type)}
                          </Box>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box w="20%" px="1rem" py="0.5" textAlign="center">
                          <Box fontWeight="500">{property.name}</Box>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box w="43%" px="1rem" py="0.5" textAlign="center">
                          <Box fontWeight="500">{property.description}</Box>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box w="10%" px="0.5rem" py="0.5" textAlign="center">
                          <Box fontWeight="500">
                            <Badge
                              w="auto"
                              justifyContent="center"
                              borderRadius="7px"
                              ml="-0.5"
                              px="1"
                              py="0.5"
                              bg="defaultColor.500"
                              color="#fff"
                              display="flex"
                              alignItems="center"
                            >
                              Inquilino
                            </Badge>
                          </Box>
                        </Box>
                        {/* <Box w="10%" px="1rem" py="0.5" textAlign="center">
                          <PropertyDetails
                            propertyName={property.name}
                            property={property}
                          />
                        </Box> */}
                      </>
                    </HStack>
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
