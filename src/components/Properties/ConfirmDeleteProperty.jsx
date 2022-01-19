import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";

const ConfirmDeleteProperty = (props) => {
  const { handleDeleteProperty } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={close}
        placement="top"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Button variant="delete-button" mr={3} onClick={open}>
            Borrar propiedad
          </Button>
        </PopoverTrigger>
        <PopoverContent bg="defaultColor.50" _focus={{ boxShadow: "none" }}>
          <PopoverHeader fontWeight="semibold">Confirmación</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton mt="1" _hover={{ bg: "rgba(0, 0, 0, 0.20)" }} />
          <PopoverBody>
            ¿Estás seguro de que deseas eliminar esta propiedad?
          </PopoverBody>
          <PopoverFooter d="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button
                variant="cancel-action-black"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button variant="delete-button" onClick={handleDeleteProperty}>
                Confirmar
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ConfirmDeleteProperty;
