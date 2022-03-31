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
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { HiPlus } from "react-icons/hi";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import SocialList from "../../Social/SocialList";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "../../Other/DatePicker/DatePicker";
import PostImagesManagement from "./PostImagesManagement";
import { IoLogoUsd } from "react-icons/io";
import Notification from "../../Other/Notification";
import mercadoLibreIcon from "../../../assets/mercado-libre-icon.png";

const CreatePost = (props) => {
  const { full, property, normalAddButton, noRightMargin } = props;
  const { addPost, imagesPendingToAddForPost, setImagesPendingToAddForPost } =
    useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isForRent, setIsForRent] = useState(false);
  const [isForSale, setIsForSale] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [
    showDateCannotBeLessThanTodayError,
    setShowDateCannotBeLessThanTodayError,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const submitPost = (data) => {
    if (data.startDate > data.endDate) {
      setShowDateError(true);
      setTimeout(() => {
        setShowDateError(false);
      }, 5000);
    } else {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      let startDateWithoutHours = data.startDate.setHours(0, 0, 0, 0);
      if (startDateWithoutHours < today) {
        setShowDateCannotBeLessThanTodayError(true);
        setTimeout(() => {
          setShowDateCannotBeLessThanTodayError(false);
        }, 5000);
      } else {
        if (isForSale == false && isForRent == false) {
          Notification(
            `Error al crear publicación`,
            `Debes especificar si la publicación es para alquiler, venta o ambos`,
            "warning"
          );
        } else {
          if (data.forSalePrice == undefined) {
            data.forSalePrice = 0;
          }
          if (data.forRentPrice == undefined) {
            data.forRentPrice = 0;
          }
          if (imagesPendingToAddForPost.length == 0) {
            Notification(
              `Error al crear publicación`,
              `Debes agregar al menos una imagen`,
              "warning"
            );
          } else {
            if (imagesPendingToAddForPost) {
              data.media = imagesPendingToAddForPost;
            }
            addPost(data, property._id);
            reset();
            setIsForSale(false);
            setIsForRent(false);
            onClose();
            setImagesPendingToAddForPost([]);
          }
        }
      }
    }
  };

  const checkPropertyMedia = () => {
    if (property.media.length == 0) {
      Notification(
        `No puedes crear publicaciones para esta propiedad`,
        `La propiedad debe tener al menos una imagen para poder crear una publicación`,
        "warning"
      );
    } else {
      onOpen();
    }
  };

  return (
    <>
      <>
        <Button
          id="createPosts"
          w={full === "yes" ? "100%" : "7rem"}
          onClick={() => checkPropertyMedia()}
          fontSize="15px"
          leftIcon={<HiPlus fontSize="1.2rem" />}
          mr={noRightMargin ? 0 : 5}
          borderRadius="9px"
          variant={normalAddButton ? "add-button-dark" : "add-button-clear"}
        >
          {normalAddButton ? "Agregar" : " Crear publicación"}
        </Button>
        <Drawer size="md" isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="defaultColor.400">
            <DrawerCloseButton
              _focus={{ boxShadow: "none" }}
              color="#fff"
              mt="2"
            />
            <DrawerHeader color="#fff" borderBottomWidth="1px">
              Crear publicación
            </DrawerHeader>
            <DrawerBody color="#fff">
              <form id="formPost" onSubmit={handleSubmit(submitPost)}>
                <Stack spacing="14px">
                  <SimpleGrid mb="-5" columns={1}>
                    <Box display="flex" mb="4">
                      <FormControl
                        display="flex"
                        mt="2rem"
                        alignItems="center"
                        onChange={() => setIsForSale(!isForSale)}
                      >
                        <FormLabel htmlFor="createPostSellSwitch" mb="0">
                          Disponible para vender
                        </FormLabel>
                        <Switch
                          isChecked={isForSale == true ? true : false}
                          {...register("isForSale")}
                          id="createPostSellSwitch"
                        />
                      </FormControl>
                      <Box>
                        <FormLabel
                          ml="-3.5rem"
                          textAlign="center"
                          htmlFor="createPostSellPrice"
                        >
                          Precio venta
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<IoLogoUsd color="#cacaca" />}
                          />
                          <Input
                            type="number"
                            defaultValue="0"
                            disabled={isForSale == true ? false : true}
                            {...register("forSalePrice")}
                            id="createPostSellPrice"
                          ></Input>
                        </InputGroup>
                      </Box>
                    </Box>
                    <Box display="flex" mb="8">
                      <FormControl
                        display="flex"
                        mt="2rem"
                        alignItems="center"
                        onChange={() => setIsForRent(!isForRent)}
                      >
                        <FormLabel htmlFor="createPostRentSwitch" mb="0">
                          Disponible para alquilar
                        </FormLabel>
                        <Switch
                          isChecked={isForRent == true ? true : false}
                          {...register("isForRent")}
                          id="createPostRentSwitch"
                        />
                      </FormControl>
                      <Box>
                        <FormLabel
                          ml="-2.5rem"
                          textAlign="center"
                          htmlFor="createPostRentPrice"
                        >
                          Precio alquiler
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<IoLogoUsd color="#cacaca" />}
                          />
                          <Input
                            type="number"
                            defaultValue="0"
                            disabled={isForRent == true ? false : true}
                            {...register("forRentPrice")}
                            id="createPostRentPrice"
                          ></Input>
                        </InputGroup>
                      </Box>
                    </Box>
                    <Box mb="1.5rem" mt="-1rem">
                      <FormLabel htmlFor="propertyTitle">Título</FormLabel>
                      <Input
                        {...register("title", {
                          required: "Título es requerido.",
                        })}
                        id="propertyTitle"
                        placeholder="Ingresa el título"
                        autoComplete="off"
                      />
                      {errors.title && (
                        <Badge variant="required-error">
                          {errors.title.message}
                        </Badge>
                      )}
                    </Box>
                  </SimpleGrid>
                  <SimpleGrid columns={2} spacing={10}>
                    <Stack spacing="14px" id="leftColumn">
                      <Box>
                        <FormLabel htmlFor="createPostStartDate">
                          Fecha inicio
                        </FormLabel>
                        <Controller
                          control={control}
                          name="startDate"
                          rules={{ required: "Fecha de inicio es requerida." }}
                          render={({ field }) => (
                            <DatePicker
                              field={field}
                              placeholderText={"Ingresa la fecha de inicio"}
                              id={"createPostStartDate"}
                            />
                          )}
                        />
                        {errors.startDate && (
                          <Badge variant="required-error">
                            {errors.startDate.message}
                          </Badge>
                        )}
                        <Badge
                          display={
                            showDateCannotBeLessThanTodayError
                              ? "inline-block"
                              : "none"
                          }
                          mb="-1rem"
                          variant="required-error"
                          whiteSpace="initial"
                        >
                          La fecha de inicio debe ser mayor a la fecha actual
                        </Badge>
                      </Box>
                    </Stack>
                    <Stack spacing="24px" id="rightColumn">
                      <Box>
                        <FormLabel htmlFor="createPostEndDate">
                          Fecha fin
                        </FormLabel>
                        <Controller
                          control={control}
                          name="endDate"
                          rules={{ required: "Fecha de fin es requerida." }}
                          render={({ field }) => (
                            <DatePicker
                              field={field}
                              placeholderText={"Ingresa la fecha de fin"}
                              id={"createPostEndDate"}
                            />
                          )}
                        />
                        {errors.endDate && (
                          <Badge variant="required-error">
                            {errors.endDate.message}
                          </Badge>
                        )}
                        <Badge
                          display={showDateError ? "inline-block" : "none"}
                          mb="-1rem"
                          variant="required-error"
                          whiteSpace="initial"
                        >
                          Fecha de fin no puede ser anterior a la de inicio
                        </Badge>
                      </Box>
                    </Stack>
                  </SimpleGrid>
                </Stack>
                <SimpleGrid columns={2} spacing={10}>
                  <Box mt="1rem">
                    <FormLabel>Imágenes</FormLabel>
                    <PostImagesManagement
                      buttonText="Agregar imágenes"
                      property={property}
                    />
                  </Box>
                  <Box mt="1rem">
                    <Text fontSize="1rem" fontWeight="semibold" mb="2">
                      Publicar en
                    </Text>
                    <Box
                      display="flex"
                      alignItems="center"
                      border="1px solid"
                      borderColor="inherit"
                      borderRadius="7px"
                      h="2.5rem"
                      pl="0.9rem"
                      pr="0.9rem"
                      w="13rem"
                      justifyContent="center"
                      bg="#cc9f0b"
                    >
                      <FormLabel htmlFor="postIn" mt="0" mb="0" mr="2">
                        {<Image src={mercadoLibreIcon} alt="MercadoLibre" />}
                      </FormLabel>
                      <FormLabel htmlFor="postIn" m="0">
                        MercadoLibre
                      </FormLabel>
                      <Switch
                        id="postIn"
                        {...register("mercadoLibre")}
                        ml="3"
                      />
                    </Box>
                  </Box>
                </SimpleGrid>
              </form>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="cancel-action" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                form="formPost"
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

export default CreatePost;
