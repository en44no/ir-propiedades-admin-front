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
import { FaTrashAlt, FaUserMinus } from "react-icons/fa";
import React from "react";

const ConfirmDelete = (props) => {
  const {
    functionToExecute,
    text,
    topText,
    element,
    name,
    onlyText,
    anotherElement,
    onlyIcon,
    icon,
    noMarginTopInIcon,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const execute = () => {
    onClose();
    functionToExecute(element, anotherElement ? anotherElement : null);
  };

  return (
    <>
      {onlyIcon ? (
        <Box onClick={onOpen} mt={noMarginTopInIcon ? "0" : "7px"} ml="6.5px">
          {icon === "userIcon" ? (
            <FaUserMinus fontSize="1.3rem" cursor="pointer" />
          ) : (
            <FaTrashAlt fontSize="0.9rem" />
          )}
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
        <Button mr="0.8rem" w="10rem" onClick={onOpen} variant="delete-button">
          <Text>Eliminar propiedad</Text>
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
          <AlertDialogBody>
            <Box mt="-2" fontWeight="500" fontSize="0.95rem">
              {topText}
            </Box>
            <Box mt="2">{text}</Box>
          </AlertDialogBody>
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
