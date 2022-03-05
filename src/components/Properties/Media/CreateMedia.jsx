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
  } = useForm();

  const submitMedia = (data) => {
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
          leftIcon={<HiPlus fontSize="1.2rem" />}
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
                      pt="0.3rem"
                      type="file"
                      onChange={(e) => {
                        setSelectedImage(e.target.files[0]);
                      }}
                      id="createMediaImage"
                      w="100%"
                      fontSize="1rem"
                    ></Input>
                  </Box>
                  <Box>
                    <FormLabel htmlFor="createMediaDescription">
                      Descripción
                    </FormLabel>
                    <Textarea
                      {...register("description")}
                      id="createMediaDescription"
                      placeholder="Ingresa la descripción"
                    ></Textarea>
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
