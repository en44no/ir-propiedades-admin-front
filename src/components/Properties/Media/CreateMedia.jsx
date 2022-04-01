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
import Notification from "../../Other/Notification";

const CreateMedia = (props) => {
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

  const selectImage = (event) => {
    setSelectedImage(event.target.files[0]);
    errors.image = null;
  };

  const submitMedia = (data) => {
    if (
      selectedImage.type == "image/jpeg" ||
      selectedImage.type == "image/png"
    ) {
      data.image = selectedImage;
      data.position = property.media.length + 1;
      addMedia(data, property);
      reset();
      onClose();
    } else {
      Notification(
        `Error al subir archivo`,
        "Solo se permiten imagenes jpeg y png",
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
              Subir imagen {property.name ? `para "${property.name}"` : ""}
            </DrawerHeader>
            <DrawerBody color="#fff">
              <form id="formMedia" onSubmit={handleSubmit(submitMedia)}>
                <Stack spacing="14px">
                  <Box>
                    <FormLabel htmlFor="createMediaImage">Imagen</FormLabel>
                    <Input
                      pt="0.3rem"
                      type="file"
                      accept="image/jpeg, image/png"
                      {...register("image", {
                        required: "Imagen es requerido.",
                      })}
                      onChange={(e) => {
                        selectImage(e);
                      }}
                      id="createMediaImage"
                      w="100%"
                      fontSize="1rem"
                    ></Input>
                    {errors.image && (
                      <Badge variant="required-error">
                        {errors.image.message}
                      </Badge>
                    )}
                  </Box>
                  <Box>
                    <FormLabel htmlFor="createMediaDescription">
                      Descripción
                    </FormLabel>
                    <Textarea
                      {...register("description", {
                        required: "Descripción es requerido.",
                      })}
                      id="createMediaDescription"
                      placeholder="Ingresa la descripción"
                    ></Textarea>
                    {errors.description && (
                      <Badge variant="required-error">
                        {errors.description.message}
                      </Badge>
                    )}
                  </Box>
                  <Box>
                    <FormLabel htmlFor="createMediaType">Tipo</FormLabel>
                    <Select
                      {...register("type", {
                        required: "Tipo es requerido.",
                      })}
                      id="createMediaType"
                      placeholder="Ingresa el tipo"
                    >
                      <option value="Imagen">Imagen</option>
                      <option value="360">Imagen 360</option>
                    </Select>
                    {errors.type && (
                      <Badge variant="required-error">
                        {errors.type.message}
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

export default CreateMedia;
