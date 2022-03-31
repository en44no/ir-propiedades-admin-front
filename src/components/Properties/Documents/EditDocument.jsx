import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import { useForm } from "react-hook-form";

const EditDocument = (props) => {
  const { document, property } = props;
  const { editDocument } = useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reactiveDocument, setReactiveDocument] = useState(document);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitDocument = (data) => {
    editDocument(data, document._id, property._id);
    reset();
    onClose();
  };

  useEffect(() => {
    setReactiveDocument(document);
  }, [document]);

  return (
    <>
      <>
        <Button
          w="100%"
          bg="none"
          _hover={{ background: "none" }}
          onClick={onOpen}
          _active={{ boxShadow: "none" }}
          _focus={{ boxShadow: "none" }}
        >
          <Text pt="0.7rem">Editar</Text>
        </Button>
        <Drawer isOpen={isOpen} size="sm" placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent
            borderRight="1px white solid"
            bg="defaultColor.400"
            borderStartEndRadius="7px"
            borderEndEndRadius="7px"
          >
            <DrawerCloseButton
              _focus={{ boxShadow: "none" }}
              color="#fff"
              mt="2"
            />
            <DrawerHeader color="#fff" borderBottomWidth="1px">
              Editar documento
            </DrawerHeader>
            <DrawerBody color="#fff">
              <form
                id="formEditDocument"
                onSubmit={handleSubmit(submitDocument)}
              >
                <Stack spacing="14px">
                  <Box>
                    <FormLabel margin="0" htmlFor="editDocumentFile">
                      Archivo (PDF o imagen)
                      <Input
                        disabled
                        mt="0.4rem"
                        pt="0.3rem"
                        type="file"
                        w="100%"
                        fontSize="1rem"
                        id="editDocumentFile"
                      ></Input>
                    </FormLabel>
                  </Box>
                  <Box>
                    <FormLabel htmlFor="editDocumentName">Nombre</FormLabel>
                    <Input
                      {...register("name", {
                        required: "Nombre es requerido.",
                      })}
                      id="editDocumentName"
                      value={reactiveDocument.name}
                      onChange={(e) =>
                        setReactiveDocument({
                          ...reactiveDocument,
                          name: e.target.value,
                        })
                      }
                      placeholder="Ingresa el nombre"
                      autoComplete="off"
                    />
                    {errors.name && (
                      <Badge variant="required-error">
                        {errors.name.message}
                      </Badge>
                    )}
                  </Box>
                  <Box>
                    <FormLabel htmlFor="editDocumentDescription">
                      Descripción
                    </FormLabel>
                    <Textarea
                      {...register("description", {
                        required: "Descripción es requerido.",
                      })}
                      id="editDocumentDescription"
                      value={reactiveDocument.description}
                      onChange={(e) =>
                        setReactiveDocument({
                          ...reactiveDocument,
                          description: e.target.value,
                        })
                      }
                      placeholder="Ingresa la descripción"
                      autoComplete="off"
                    />
                    {errors.description && (
                      <Badge variant="required-error">
                        {errors.description.message}
                      </Badge>
                    )}
                  </Box>
                </Stack>
              </form>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="cancel-action" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                form="formEditDocument"
                type="submit"
                variant="confirm-add-button"
              >
                Confirmar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default EditDocument;
