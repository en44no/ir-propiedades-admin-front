import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import React from "react";

const ConfirmDelete = (props) => {
  const {
    functionToExecute,
    text,
    element,
    name,
    onlyText,
    anotherElement,
    onlyIcon,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const execute = () => {
    onClose();
    functionToExecute(element, anotherElement);
  };

  return (
    <>
      {onlyIcon ? (
        <Box onClick={onOpen} mt="5px" ml="5px">
          <FaTrashAlt />
        </Box>
      ) : onlyText ? (
        <Button
          w="100%"
          bg="none"
          _hover={{ background: "none" }}
          onClick={onOpen}
          _active={{ boxShadow: "none" }}
          _focus={{ boxShadow: "none" }}
        >
          <Text pt="0.7rem">Eliminar</Text>
        </Button>
      ) : (
        <Button mr="0.8rem" w="7rem" onClick={onOpen} variant="delete-button">
          <Text>Eliminar</Text>
        </Button>
      )}

      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent bg="defaultColor.400" color="#fff">
          <AlertDialogHeader>Eliminar {name}</AlertDialogHeader>
          <AlertDialogCloseButton mt="0.5rem" _focus={{ boxShadow: "none" }} />
          <AlertDialogBody>{text}</AlertDialogBody>
          <AlertDialogFooter>
            <Button variant="cancel-action" onClick={onClose}>
              No
            </Button>
            <Button variant="delete-button" onClick={() => execute()} ml={3}>
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ConfirmDelete;
