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
import React, { useContext } from "react";
import { HiPlus } from "react-icons/hi";
import PropertiesContext from "../../../context/PropertiesContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "./DatePicker.css";
import SocialList from "../../Social/SocialList";
import { Controller, useForm } from "react-hook-form";
registerLocale("es", es);
setDefaultLocale("es");

const CreatePost = (props) => {
  const { full, property, normalAddButton } = props;
  const { addPost } = useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const submitPost = (data) => {
    addPost(data, property._id);
    reset();
    onClose();
  };

  const submitForm = () => {
    document.getElementById("submitButtonCreatePost").click();
  };

  return (
    <>
      <>
        <Button
          id="createPosts"
          w={full === "yes" ? "100%" : "8rem"}
          onClick={onOpen}
          fontSize="15px"
          leftIcon={normalAddButton ? <HiPlus fontSize="1.2rem" /> : null}
          mr={5}
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
                      <FormControl display="flex" mt="2rem" alignItems="center">
                        <FormLabel htmlFor="createPostSellSwitch" mb="0">
                          Disponible para vender
                        </FormLabel>
                        <Switch
                          {...register("isForRent")}
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
                          {...register("forSalePrice")}
                          id="createPostSellPrice"
                        ></Input>
                      </Box>
                    </Box>
                    <Box display="flex" mb="4">
                      <FormControl display="flex" mt="2rem" alignItems="center">
                        <FormLabel htmlFor="createPostRentSwitch" mb="0">
                          Disponible para alquilar
                        </FormLabel>
                        <Switch
                          {...register("isForSale")}
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
                              autoComplete="off"
                              id="createPostStartDate"
                              placeholderText="Ingresa la fecha de inicio"
                              className="datePicker"
                              dateFormat="dd/MM/yyyy"
                              todayButton="Hoy"
                              showYearDropdown
                              yearDropdownItemNumber={4}
                              locale="es"
                              onChange={(date) => field.onChange(date)}
                              selected={field.value}
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
                              autoComplete="off"
                              id="createPostEndDate"
                              placeholderText="Ingresa la fecha de fin"
                              className="datePicker"
                              dateFormat="dd/MM/yyyy"
                              todayButton="Hoy"
                              showYearDropdown
                              yearDropdownItemNumber={4}
                              locale="es"
                              onChange={(date) => field.onChange(date)}
                              selected={field.value}
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
              <Button onClick={submitForm} variant="confirm-add-button">
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
