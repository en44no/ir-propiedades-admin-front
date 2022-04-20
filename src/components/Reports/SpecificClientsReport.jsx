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
  Image,
} from "@chakra-ui/react";
import { MdLooksOne } from "react-icons/md";
import NoImage from "../../assets/userIcon.png";

const SpecificClientsReport = (props) => {
  const { buttonText, modalTitle, customers, topText } = props;
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
                <Box display="flex" gap="2rem">
                  {topText && customers.length > 0 ? (
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
                      El sistema no cuenta con clientes sin propiedades.
                    </Text>
                  )}
                  {customers.map((customer) => (
                    <Box
                      key={customer.id}
                      border="2px solid #fff"
                      borderRadius="7px"
                      p="0.2rem"
                      minW="15rem"
                      maxW="15rem"
                    >
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
                          gap="1rem"
                          justifyContent="space-between"
                        >
                          <Text>{customer.phone}</Text>
                          <Text>{customer.email}</Text>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SpecificClientsReport;
