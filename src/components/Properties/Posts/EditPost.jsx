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
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import SocialList from "../../Social/SocialList";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "../../Other/DatePicker/DatePicker";
import moment from "moment";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import PostImagesManagement from "./PostImagesManagement";
import { IoLogoUsd } from "react-icons/io";
import Notification from "../../Other/Notification";

const EditPost = (props) => {
  const { post, property } = props;
  const { editPost, imagesPendingToAddForPost } = useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isForRent, setIsForRent] = useState(
    post.isForRent == true ? true : false
  );
  const [isForSale, setIsForSale] = useState(
    post.isForSale == true ? true : false
  );
  const [notAbleToModify, setNotAbleToModify] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [warningStatusMessage, setWarningStatusMessage] = useState("");
  const [showDateError, setShowDateError] = useState(false);
  const [reactivePost, setReactivePost] = useState(post);

  useEffect(() => {
    setReactivePost(post);
  }, [post]);

  const checkIsAllDisabled = () => {
    if (post.status == "Finalizada") {
      return true;
    } else if (post.status == "Pausada") {
      let now = new Date();
      let endDate = new Date(post.endDate);
      if (endDate <= now) {
        return true;
      }
    } else {
      return false;
    }
  };

  const [allDisabled, setAllDisabled] = useState(checkIsAllDisabled());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const submitEditPost = (data) => {
    if (data.startDate == undefined) {
      data.startDate = post.startDate;
    }
    if (data.endDate == undefined) {
      data.endDate = post.endDate;
    }
    if (notAbleToModify) {
      data.isForSale = false;
      data.isForRent = false;
    }
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
      if (data.startDate > data.endDate) {
        setShowDateError(true);
        setTimeout(() => {
          setShowDateError(false);
        }, 5000);
      } else {
        if (data.media != undefined && post.media.length == 0) {
          Notification(
            `Error al editar publicación`,
            `Debes agregar al menos una imagen`,
            "warning"
          );
        } else {
          if (imagesPendingToAddForPost) {
            data.media = imagesPendingToAddForPost;
          }
        }
        editPost(data, post._id, property._id);
        reset();
        onClose();
      }
    }
  };

  const checkState = (state) => {
    if (state === "Activa") {
      setNotAbleToModify(false);
      setIsForSale(true);
      setIsForRent(true);
      setWarningStatusMessage(false);
      setSelectedStatus("Activa");
    } else if (state === "Pendiente") {
      setNotAbleToModify(false);
      setIsForSale(true);
      setIsForRent(true);
      setWarningStatusMessage(false);
      setSelectedStatus("Pendiente");
    } else if (state == "Pausada") {
      setNotAbleToModify(true);
      setIsForSale(false);
      setIsForRent(false);
      setWarningStatusMessage(true);
      setSelectedStatus("Pausada");
    } else if (state == "Finalizada") {
      setNotAbleToModify(true);
      setIsForSale(false);
      setIsForRent(false);
      setWarningStatusMessage(true);
      setSelectedStatus("Finalizada");
    }
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };

  return (
    <>
      <>
        <Button
          id="createPosts"
          w="100%"
          onClick={onOpen}
          bg="none"
          _hover={{ background: "none" }}
          _active={{ boxShadow: "none" }}
          _focus={{ boxShadow: "none" }}
        >
          <Text pt="0.7rem">Editar</Text>
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
              Editar publicación
            </DrawerHeader>
            {!allDisabled && (
              <>
                <DrawerBody color="#fff">
                  <form id="formPost" onSubmit={handleSubmit(submitEditPost)}>
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
                              {notAbleToModify
                                ? "No disponible para vender"
                                : "Disponible para vender"}
                            </FormLabel>
                            {notAbleToModify == false && (
                              <Switch
                                isChecked={isForSale == true ? true : false}
                                {...register("isForSale")}
                                id="createPostSellSwitch"
                              />
                            )}
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
                                {...register("forSalePrice")}
                                type="number"
                                disabled={isForSale == true ? false : true}
                                value={reactivePost.forSalePrice}
                                onChange={(e) =>
                                  setReactivePost({
                                    ...reactivePost,
                                    forSalePrice: e.target.value,
                                  })
                                }
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
                          >
                            <FormLabel htmlFor="createPostRentSwitch" mb="0">
                              {notAbleToModify
                                ? "No disponible para alquilar"
                                : "Disponible para alquilar"}
                            </FormLabel>
                            {notAbleToModify == false && (
                              <Switch
                                isChecked={isForRent == true ? true : false}
                                {...register("isForRent")}
                                id="createPostRentSwitch"
                                onChange={() => setIsForRent(!isForRent)}
                              />
                            )}
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
                                {...register("forRentPrice")}
                                type="number"
                                disabled={isForRent == true ? false : true}
                                value={reactivePost.forRentPrice}
                                onChange={(e) =>
                                  setReactivePost({
                                    ...reactivePost,
                                    forRentPrice: e.target.value,
                                  })
                                }
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
                            value={reactivePost.title}
                            onChange={(e) =>
                              setReactivePost({
                                ...reactivePost,
                                title: e.target.value,
                              })
                            }
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
                          {post.status == "Pendiente" ? (
                            <Box>
                              <FormLabel htmlFor="createPostStartDate">
                                Fecha inicio
                              </FormLabel>
                              <Controller
                                control={control}
                                name="startDate"
                                render={({ field }) => (
                                  <DatePicker
                                    defaultSelected={moment(
                                      post.startDate
                                    ).toDate()}
                                    field={field}
                                    placeholderText={
                                      "Ingresa la fecha de inicio"
                                    }
                                    id={"createPostStartDate"}
                                  />
                                )}
                              />
                              {errors.startDate && (
                                <Badge variant="required-error">
                                  {errors.startDate.message}
                                </Badge>
                              )}
                            </Box>
                          ) : (
                            <Box>
                              <FormLabel htmlFor="createPostStartDate">
                                Fecha inicio
                              </FormLabel>
                              <Text>
                                Modificable sólo cuando la publicación está
                                pendiente
                              </Text>
                            </Box>
                          )}
                        </Stack>
                        <Stack spacing="24px" id="rightColumn">
                          <Box>
                            <FormLabel htmlFor="createPostEndDate">
                              Fecha fin
                            </FormLabel>
                            <Controller
                              control={control}
                              name="endDate"
                              render={({ field }) => (
                                <DatePicker
                                  defaultSelected={moment(
                                    post.endDate
                                  ).toDate()}
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
                        <Button
                          visibility="hidden"
                          type="submit"
                          id="submitButtonCreatePost"
                        ></Button>
                      </SimpleGrid>
                    </Stack>
                    <SimpleGrid columns={2} spacing={10}>
                      <Box mt="-14">
                        <FormLabel htmlFor="createPostEndDate">
                          Estado
                        </FormLabel>
                        <Select
                          {...register("status", {
                            required: "Estado es requerido.",
                          })}
                          value={reactivePost.status}
                          onChange={(e) => {
                            setReactivePost({
                              ...reactivePost,
                              status: e.target.value,
                            });
                            checkState(e.target.value);
                          }}
                          id="propertyTypes"
                        >
                          <option value="Activa">Activa</option>
                          <option value="Pendiente">Pendiente</option>
                          <option value="Pausada">Pausada</option>
                          <option value="Finalizada">Finalizada</option>
                        </Select>
                        {errors.status && (
                          <Badge variant="required-error">
                            {errors.status.message}
                          </Badge>
                        )}
                      </Box>
                      <Box mt="-3.5rem">
                        <FormLabel htmlFor="createPostEndDate">
                          Imágenes
                        </FormLabel>
                        <PostImagesManagement property={property} post={post} />
                      </Box>
                      <Box mt="-1.5rem">
                        <SocialList
                          isOnMercadoLibre={
                            post.mercadoLibreLink != null ? true : false
                          }
                        />
                      </Box>
                    </SimpleGrid>
                  </form>
                </DrawerBody>
                <Badge
                  display={warningStatusMessage ? "inline-block" : "none"}
                  mb="1rem"
                  w="93%"
                  ml="1rem"
                  variant="required-warning"
                  whiteSpace="initial"
                >
                  {selectedStatus === "Pausada"
                    ? `Ten en cuenta que si el estado es "Pausada" la publicación dejará de estar disponible, tienes hasta el ${formatDate(
                        post.endDate
                      )} para activarla.`
                    : 'Ten en cuenta que si el estado es "Finalizada" no podrás reanudarla y la publicación dejará de estar disponible.'}
                </Badge>
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
              </>
            )}
            {allDisabled && (
              <>
                <Text
                  fontSize="xl"
                  color="#EAE9ED"
                  position="relative"
                  display="flex"
                  textAlign="center"
                  h="100%"
                  w="100%"
                  p="1rem"
                  justifyContent="center"
                  alignItems="center"
                >
                  Ya no puedes editar esta publicación debido a que fue pausada
                  y no se reanudó a tiempo o se encuentra finalizada.
                </Text>
                <DrawerFooter borderTopWidth="1px">
                  <Button variant="cancel-action" mr={3} onClick={onClose}>
                    Cerrar
                  </Button>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default EditPost;
