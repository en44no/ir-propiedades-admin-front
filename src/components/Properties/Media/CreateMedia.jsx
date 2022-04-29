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
  HStack,
  Input,
  Select,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { MdFileUpload } from "react-icons/md";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import Notification from "../../Other/Notification";
import { FaTrashAlt } from "react-icons/fa";
import FullscreenImageModal from "../../Other/FullscreenImageModal";

const CreateMedia = (props) => {
  const { full, property, normalAddButton, noRightMargin } = props;
  const { addMedia, setImagesAreLoading } = useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImages, setSelectedImages] = useState([]);
  const [showDescriptionError, setShowDescriptionError] = useState(false);

  const selectImages = (files) => {
    if (files.length > 0) {
      const images = [...files];
      let newImages = [];
      images.forEach((element) => {
        if (element.type == "image/jpeg" || element.type == "image/png") {
          newImages.push(element);
        } else {
          Notification(
            `Error al subir archivo`,
            "Solo se permiten imagenes jpeg y png",
            "warning"
          );
        }
      });
      newImages = selectedImages.concat(images);
      setSelectedImages(newImages);
    }
  };

  const removeSelectedImage = (file) => {
    const files = [...selectedImages];
    let newFiles = files.filter((image) => image != file);
    setSelectedImages(newFiles);
  };

  const submitMedia = () => {
    if (selectedImages.length > 0) {
      if (
        selectedImages.find(
          (image) => image.description == "" || image.description == null
        )
      ) {
        setShowDescriptionError(true);
      } else {
        let counter = selectedImages.length - 1;
        selectedImages.forEach((image) => {
          setImagesAreLoading(true);
          let data = {};
          data.image = image;
          data.description = image.description;
          data.type = image.imgType ? image.imgType : "Imagen";
          data.position = property.media.length + 1;
          addMedia(data, property, counter);
          counter--;
        });
        setSelectedImages([]);
        onClose();
      }
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
        <Drawer isOpen={isOpen} size="xl" placement="left" onClose={onClose}>
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
              Subir imágenes
            </DrawerHeader>
            <DrawerBody color="#fff">
              <Stack spacing="14px">
                <Box>
                  <FormLabel>Imagen</FormLabel>
                  <FormLabel
                    htmlFor="createMediaImage"
                    bg="defaultColor.500"
                    borderRadius="9px"
                    fontSize="15px"
                    w="100%"
                    h="2.5rem"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    _hover={{ background: "defaultColor.700" }}
                    gap="0.5rem"
                    cursor="pointer"
                  >
                    <MdFileUpload fontSize="1.3rem" />
                    Agregar imágenes | {selectedImages.length}{" "}
                    {selectedImages.length == 1
                      ? "seleccionada"
                      : "seleccionadas"}
                  </FormLabel>
                  <Input
                    pt="0.3rem"
                    type="file"
                    accept="image/jpeg, image/png"
                    multiple
                    onChange={(e) => {
                      selectImages(e.target.files);
                    }}
                    id="createMediaImage"
                    w="100%"
                    fontSize="1rem"
                    hidden
                  ></Input>
                </Box>
                {selectedImages &&
                  [...selectedImages].map((file) => (
                    <HStack
                      h="auto"
                      py="1rem"
                      border="1px solid white"
                      borderRadius="7px"
                      position="relative"
                    >
                      <Box
                        w="10%"
                        pl="0.8rem"
                        display="flex"
                        justifyContent="center"
                      >
                        <FullscreenImageModal
                          src={URL.createObjectURL(file)}
                          hover="yes"
                          text="Imagen pendiente de ser agregada"
                          description=""
                          width="3rem"
                          height="3rem"
                          borderRadius="7px"
                        />
                      </Box>
                      <Box w="55%" pr="1rem">
                        <Box>
                          <FormLabel htmlFor="createMediaDescription">
                            Descripción
                          </FormLabel>
                          <Input
                            id="createMediaDescription"
                            placeholder="Ingresa la descripción"
                            type="text"
                            autoComplete="off"
                            onChange={(e) => {
                              (selectedImages.find(
                                (image) => image == file
                              ).description = e.target.value),
                                setShowDescriptionError(false);
                            }}
                          ></Input>
                        </Box>
                      </Box>
                      <Box w="30%">
                        <Box>
                          <FormLabel htmlFor="createMediaType">Tipo</FormLabel>
                          <Select
                            onChange={(e) =>
                              (selectedImages.find(
                                (image) => image == file
                              ).imgType = e.target.value)
                            }
                            id="createMediaType"
                          >
                            <option value="Imagen">Imagen</option>
                            <option value="360">Imagen 360</option>
                          </Select>
                        </Box>
                      </Box>

                      <Box
                        onClick={() => removeSelectedImage(file)}
                        bg="defaultColor.300"
                        borderRadius="50%"
                        position="absolute"
                        p="0"
                        minW="1.7rem"
                        minH="1.7rem"
                        h="1.7rem"
                        w="1.7rem"
                        top="2.5"
                        right="2.5"
                        cursor="pointer"
                        _hover={{
                          bg: "defaultColor.200",
                        }}
                      >
                        <Box ml="6.5px" mt="6.5px">
                          <FaTrashAlt fontSize="0.9rem" />
                        </Box>
                      </Box>
                    </HStack>
                  ))}
              </Stack>
            </DrawerBody>
            <Box px="2rem">
              <Badge
                display={showDescriptionError ? "inline-block" : "none"}
                mb="1rem"
                variant="required-error"
                whiteSpace="initial"
              >
                La descripción de todas las imágenes es requerida
              </Badge>
            </Box>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="cancel-action" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                onClick={() => submitMedia()}
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
