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
  Select,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { MdFileUpload } from "react-icons/md";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import { useForm } from "react-hook-form";

const CreateDocument = (props) => {
  const { full, property, normalAddButton, noRightMargin } = props;
  const { addMedia } = useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitMedia = (data) => {
    data.position = property.media.length + 1;
    data.image = selectedImage;
    addMedia(data, property);
    reset();
    onClose();
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
              <form id="formMedia" onSubmit={handleSubmit(submitMedia)}>
                <Stack spacing="14px">
                  <Box>
                    <FormLabel htmlFor="propertyName">Nombre</FormLabel>
                    <Input
                      {...register("name")}
                      id="propertyName"
                      placeholder="Ingresa el nombre"
                      autoComplete="off"
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="propertyDescription">
                      Descripción
                    </FormLabel>
                    <Textarea
                      {...register("description")}
                      id="propertyDescription"
                      placeholder="Ingresa la descripción"
                      autoComplete="off"
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="createMediaImage">Archivos</FormLabel>
                    <Input
                      pt="0.3rem"
                      type="file"
                      multiple
                      onChange={(e) => {
                        setSelectedImage(e.target.files[0]);
                      }}
                      id="createMediaImage"
                      w="100%"
                      fontSize="1rem"
                    ></Input>
                  </Box>
                </Stack>
              </form>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="cancel-action" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                form="formMedia"
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
