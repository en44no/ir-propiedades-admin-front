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
  FormControl,
  FormLabel,
  Input,
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

const EditPost = (props) => {
  const { post, property } = props;
  const { editPost } = useContext(PropertiesContext);
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
    editPost(data, property._id);
    reset();
    onClose();
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
            <DrawerCloseButton color="#fff" mt="2" />
            <DrawerHeader color="#fff" borderBottomWidth="1px">
              Editar publicación
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
                          defaultChecked={post.isForSale}
                          value={post.isForSale}
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
                          disabled={!isForSaleDisabled}
                          defaultValue={post.forSalePrice}
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
                          defaultChecked={post.isForRent}
                          value={post.isForRent}
                          {...register("isForRent")}
                          id="createPostRentSwitch"
                          onChange={() =>
                            setIsForRentDisabled(!isForRentDisabled)
                          }
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
                          disabled={!isForRentDisabled}
                          defaultValue={post.forRentPrice}
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
                              defaultSelected={moment(post.startDate).toDate()}
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
                              defaultSelected={moment(post.endDate).toDate()}
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
                      defaultValue={post.status}
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

export default EditPost;
