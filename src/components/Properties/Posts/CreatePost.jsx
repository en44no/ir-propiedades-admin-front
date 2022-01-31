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
  Select,
  SimpleGrid,
  Stack,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { HiPlus } from "react-icons/hi";
import PropertiesContext from "../../../context/PropertiesContext";
import SocialList from "../../Social/SocialList";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "../../Other/DatePicker/DatePicker";

const CreatePost = (props) => {
  const { full, property, normalAddButton, noRightMargin } = props;
  const { addPost } = useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isForRentDisabled, setIsForRentDisabled] = useState(true);
  const [isForSaleDisabled, setIsForSaleDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const submitPost = (data) => {
    debugger;
    addPost(data, property._id);
    reset();
    onClose();
  };

  return (
    <>
      <>
        <Button
          id="createPosts"
          w={full === "yes" ? "100%" : "8rem"}
          onClick={onOpen}
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
            <DrawerCloseButton color="#fff" mt="2" />
            <DrawerHeader color="#fff" borderBottomWidth="1px">
              Crear publicación {property.name ? `para "${property.name}"` : ""}
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
                        onChange={() =>
                          setIsForSaleDisabled(!isForSaleDisabled)
                        }
                      >
                        <FormLabel htmlFor="createPostSellSwitch" mb="0">
                          Disponible para vender
                        </FormLabel>
                        <Switch
                          value={!isForSaleDisabled}
                          {...register("isForSale")}
                          id="createPostSellSwitch"
                        />
                      </FormControl>
                      <Box>
                        <FormLabel
                          textAlign="center"
                          htmlFor="createPostSellPrice"
                        >
                          Precio venta
                        </FormLabel>
                        <Input
                          defaultValue="0"
                          disabled={isForSaleDisabled}
                          {...register("forSalePrice")}
                          id="createPostSellPrice"
                        ></Input>
                      </Box>
                    </Box>
                    <Box display="flex" mb="4">
                      <FormControl
                        display="flex"
                        mt="2rem"
                        alignItems="center"
                        onChange={() =>
                          setIsForRentDisabled(!isForRentDisabled)
                        }
                      >
                        <FormLabel htmlFor="createPostRentSwitch" mb="0">
                          Disponible para alquilar
                        </FormLabel>
                        <Switch
                          value={!isForRentDisabled}
                          {...register("isForRent")}
                          id="createPostRentSwitch"
                        />
                      </FormControl>
                      <Box>
                        <FormLabel
                          textAlign="center"
                          htmlFor="createPostRentPrice"
                        >
                          Precio alquiler
                        </FormLabel>
                        <Input
                          defaultValue="0"
                          disabled={isForRentDisabled}
                          {...register("forRentPrice")}
                          id="createPostRentPrice"
                        ></Input>
                      </Box>
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
                    <FormLabel htmlFor="createPostEndDate">Estado</FormLabel>
                    <Select
                      {...register("status", {
                        required: "Estado es requerido.",
                      })}
                      id="propertyTypes"
                      placeholder="Ingresa el estado"
                    >
                      <option value="Active">Activa</option>
                      <option value="Paused">Pausada</option>
                      <option value="Pending">Pendiente</option>
                      <option value="Finished">Finalizada</option>
                    </Select>
                    {errors.status && (
                      <Badge variant="required-error">
                        {errors.status.message}
                      </Badge>
                    )}
                  </Box>
                  <Box mt="-14">
                    <SocialList />
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
