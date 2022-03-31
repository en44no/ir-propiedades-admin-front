import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import UsersContext from "../../../context/Users/UsersContext";

const RolesInfoModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { roles } = useContext(UsersContext);

  return (
    <>
      <Box onClick={onOpen} cursor="pointer">
        <BsFillInfoCircleFill />
      </Box>

      <Modal isOpen={isOpen} size="4xl" onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="defaultColor.400" color="#fff">
          <ModalHeader>Información de los roles</ModalHeader>
          <ModalCloseButton mt="0.5rem" _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <SimpleGrid columns={2} spacing={10}>
              {roles.map((role) => (
                <Box
                  key={role._id}
                  w="100%"
                  justifyContent="center"
                  justifyItems="center"
                  textAlign="center"
                >
                  <Box fontWeight="500" mb="0.5rem" fontSize="1rem" mt="-3px">
                    {role.name}
                  </Box>
                  <Box mt="-3px">
                    {role.endpoints.map((endpoint) => (
                      <Box key={endpoint}>• {endpoint.description}</Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button variant="cancel-action" onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RolesInfoModal;
