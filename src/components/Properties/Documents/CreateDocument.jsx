import React, { useContext, useState } from "react";
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
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { MdFileUpload } from "react-icons/md";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import { useForm } from "react-hook-form";
import Notification from "../../Other/Notification";

const CreateDocument = (props) => {
  const { full, property, normalAddButton, noRightMargin } = props;
  const { addDocument } = useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const selectFile = (event) => {
    setSelectedFile(event.target.files[0]);
    errors.files = null;
  };

  const submitDocument = (data) => {
    if (
      selectedFile.type == "application/pdf" ||
      selectedFile.type == "image/jpeg" ||
      selectedFile.type == "image/png"
    ) {
      data.files = selectedFile;
      addDocument(data, property._id);
      reset();
      onClose();
    } else {
      Notification(
        `Error al subir archivo`,
        "El archivo debe ser un PDF o una imagen",
        "warning"
      );
    }
  };

  return (
    <>
      <>
        <Button
          id="createPosts"
          w={full === "yes" ? "100%" : "7rem"}
          onClick={onOpen}
          fontSize="15px"
          leftIcon={<MdFileUpload fontSize="1.3rem" />}
          mr={noRightMargin ? 0 : 5}
          borderRadius="9px"
          variant={normalAddButton ? "add-button-dark" : "add-button-clear"}
        >
          {normalAddButton ? "Subir" : " Subir imagen"}
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
              Subir documento
            </DrawerHeader>
            <DrawerBody color="#fff">
              <form
                id="formCreateDocument"
                onSubmit={handleSubmit(submitDocument)}
              >
                <Stack spacing="14px">
                  <Box>
                    <FormLabel margin="0" htmlFor="createDocumentFile">
                      Archivo (PDF o imagen)
                      <Input
                        accept="application/pdf, image/jpeg, image/png"
                        mt="0.4rem"
                        pt="0.3rem"
                        type="file"
                        {...register("files", {
                          required: "Archivo es requerido.",
                        })}
                        onChange={(e) => {
                          selectFile(e);
                        }}
                        id="createDocumentFile"
                        w="100%"
                        fontSize="1rem"
                      ></Input>
                      {errors.files && (
                        <Badge variant="required-error">
                          {errors.files.message}
                        </Badge>
                      )}
                    </FormLabel>
                  </Box>
                  <Box>
                    <FormLabel htmlFor="createDocumentName">Nombre</FormLabel>
                    <Input
                      {...register("name", {
                        required: "Nombre es requerido.",
                      })}
                      id="createDocumentName"
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
                    <FormLabel htmlFor="createDocumentDescription">
                      Descripción
                    </FormLabel>
                    <Textarea
                      {...register("description", {
                        required: "Descripción es requerido.",
                      })}
                      id="createDocumentDescription"
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
                form="formCreateDocument"
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

export default CreateDocument;
