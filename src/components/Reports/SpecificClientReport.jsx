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
  Divider,
} from "@chakra-ui/react";
import { MdLooksOne } from "react-icons/md";
import NoImage from "../../assets/userIcon.png";
import ViewCustomerProperties from "../Customers/ViewCustomerProperties";
import Loader from "../Other/Loader/Loader";

const SpecificClientReport = (props) => {
  const { buttonText, modalTitle, customer } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatDate = () => {
    const newDate = new Date();
    return newDate.toLocaleDateString("en-GB");
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
                {customer ? (
                  <Box border="2px solid #fff" borderRadius="7px">
                    <Box
                      mt="0.7rem"
                      mb="0.5rem"
                      display="flex"
                      justifyContent="center"
                    >
                      <Image loading="lazy" w="7rem" h="7rem" src={NoImage} />
                    </Box>

                    <Box p="3" color="#fff">
                      <Box display="flex" alignItems="baseline">
                        <Text
                          fontWeight="semibold"
                          textTransform="uppercase"
                          textAlign="center"
                          w="100%"
                          mt="-0.8rem"
                          fontSize="1.1rem"
                          color="defaultColor.50"
                          letterSpacing="wide"
                          alignItems="center"
                        >
                          {customer.name}
                        </Text>
                      </Box>
                      <Box
                        mt="0.5rem"
                        fontSize="0.9rem"
                        fontWeight="500"
                        display="flex"
                        gap="1rem"
                        justifyContent="space-between"
                      >
                        <Text>{customer.email}</Text>
                        <Text>{customer.phone}</Text>
                      </Box>

                      <Divider mt="1rem" />

                      <Box mt="3" fontSize="1rem" display="flex">
                        El cliente cuenta con un total de{" "}
                        <Text fontWeight="bold" ml="0.3rem" mr="0.3rem">
                          {customer.ownerProperties.length +
                            customer.tenantProperties.length}
                        </Text>{" "}
                        propiedades
                      </Box>

                      <Box w="100%" mt="0.5rem" display="flex">
                        {customer.ownerProperties.length > 0 && (
                          <Badge
                            w={
                              customer.tenantProperties.length == 0
                                ? "100%"
                                : "50%"
                            }
                            mr="0.2rem"
                            justifyContent="center"
                            borderRadius="7px"
                            py="0.5"
                            bg="defaultColor.300"
                            color="#fff"
                            display="flex"
                            fontSize="0.8rem"
                            alignItems="center"
                          >
                            <Box mr="1">{customer.ownerProperties.length}</Box>
                            <Box>Dueño</Box>
                          </Badge>
                        )}
                        {customer.tenantProperties.length > 0 && (
                          <Badge
                            w={
                              customer.ownerProperties.length == 0
                                ? "100%"
                                : "50%"
                            }
                            ml="0.2rem"
                            fontSize="0.8rem"
                            justifyContent="center"
                            borderRadius="7px"
                            py="0.5"
                            bg="defaultColor.300"
                            color="#fff"
                            display="flex"
                            alignItems="center"
                          >
                            <Box mr="1">{customer.tenantProperties.length}</Box>
                            <Box>Inquilino</Box>
                          </Badge>
                        )}
                      </Box>
                      <ViewCustomerProperties
                        ownerProperties={customer.ownerProperties}
                        tenantProperties={customer.tenantProperties}
                        customer={customer}
                        reportButton="yes"
                      />
                    </Box>
                  </Box>
                ) : (
                  <Text
                    fontSize="xl"
                    color="#fff"
                    position="relative"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    zIndex="-10"
                  >
                    El sistema aún no cuenta con clientes registrados.
                  </Text>
                )}
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SpecificClientReport;
