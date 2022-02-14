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
  useDisclosure,
} from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import { useForm } from "react-hook-form";

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
    control,
  } = useForm();

  const submitMedia = (data) => {
    data.image = selectedImage;
    addMedia(data, property._id);
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
          leftIcon={<HiPlus fontSize="1.2rem" />}
          mr={noRightMargin ? 0 : 5}
          borderRadius="9px"
          variant={normalAddButton ? "add-button-dark" : "add-button-clear"}
        >
          {normalAddButton ? "Subir" : " Subir imagen"}
        </Button>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="defaultColor.400">
            <DrawerCloseButton color="#fff" mt="2" />
            <DrawerHeader color="#fff" borderBottomWidth="1px">
              Subir imagen {property.name ? `para "${property.name}"` : ""}
            </DrawerHeader>
            <DrawerBody color="#fff">
              <form id="formMedia" onSubmit={handleSubmit(submitMedia)}>
                <Stack spacing="14px">
                  <Box>
                    <FormLabel htmlFor="createMediaImage">Imagen</FormLabel>
                    <Input
                      pt="0.5rem"
                      type="file"
                      onChange={(e) => {
                        setSelectedImage(e.target.files[0]);
                      }}
                      id="createMediaImage"
                      w="100%"
                      fontSize="0.80rem"
                    ></Input>
                  </Box>
                  <Box>
                    <FormLabel htmlFor="createMediaDescription">
                      Descripción
                    </FormLabel>
                    <Input
                      {...register("description")}
                      id="createMediaDescription"
                      placeholder="Ingresa la descripción"
                    ></Input>
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
                      <option value="Image">Imagen</option>
                      <option value="360">Imagen 360</option>
                    </Select>
                    {errors.status && (
                      <Badge variant="required-error">
                        {errors.status.message}
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
