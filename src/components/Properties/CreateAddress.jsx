import React, { useContext } from "react";
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
import PropertiesContext from "../../context/PropertiesContext";
import { useForm } from "react-hook-form";

const CreateAddress = (props) => {
  const { addAddress } = useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { full } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitAddress = (data) => {
    addAddress(data);
    document.getElementById("requiredAddress").style.display = "none";
    reset();
    onClose();
  };

  return (
    <>
      <Button
        w={full === "yes" ? "100%" : "8rem"}
        onClick={onOpen}
        fontSize="15px"
        leftIcon={HiPlus}
        mr={5}
        mb={5}
        borderRadius="9px"
        variant="add-button-clear"
      >
        Ingresar dirección
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="defaultColor.400">
          <DrawerCloseButton color="#fff" mt="2" />
          <DrawerHeader color="#fff" borderBottomWidth="1px">
            Agregar dirección
          </DrawerHeader>
          <DrawerBody color="#fff">
            <form id="addressForm" onSubmit={handleSubmit(submitAddress)}>
              <Stack spacing="14px">
                <Box>
                  <FormLabel htmlFor="addressCountry">País</FormLabel>
                  <Select
                    {...register("country", {
                      required: " País es requerido.",
                    })}
                    id="addressCountry"
                    defaultValue="option1"
                    placeholder="Ingresa el país"
                  >
                    <option value="option1">Uruguay</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                  {errors.country && (
                    <Badge variant="required-error">
                      {errors.country.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="AddressState">Provincia</FormLabel>
                  <Input
                    {...register("state", {
                      required: "Provincia es requerido.",
                    })}
                    id="AddressState"
                    placeholder="Ingresa la provincia"
                    autoComplete="off"
                  />
                  {errors.state && (
                    <Badge variant="required-error">
                      {errors.state.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="AddressCity">Ciudad</FormLabel>
                  <Input
                    {...register("city", { required: "Ciudad es requerido." })}
                    id="AddressCity"
                    placeholder="Ingresa la ciudad"
                    autoComplete="off"
                  />
                  {errors.city && (
                    <Badge variant="required-error">
                      {errors.city.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="AddressNeighborhood">Barrio</FormLabel>
                  <Input
                    {...register("neighborhood", {
                      required: "Barrio es requerido.",
                    })}
                    id="AddressNeighborhood"
                    placeholder="Ingresa el barrio"
                    autoComplete="off"
                  />
                  {errors.neighborhood && (
                    <Badge variant="required-error">
                      {errors.neighborhood.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="AddressStreet">Calle</FormLabel>
                  <Input
                    {...register("street", {
                      required: "Calle es requerido.",
                    })}
                    id="AddressStreet"
                    placeholder="Ingresa la calle"
                    autoComplete="off"
                  />
                  {errors.street && (
                    <Badge variant="required-error">
                      {errors.street.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="AddressDoor">Número de puerta</FormLabel>
                  <Input
                    {...register("door", {
                      required: "Número de puerta es requerido.",
                    })}
                    id="AddressDoor"
                    placeholder="Ingresa el número de puerta"
                    autoComplete="off"
                  />
                  {errors.door && (
                    <Badge variant="required-error">
                      {errors.door.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="AddressDetails">Detalles</FormLabel>
                  <Textarea
                    {...register("details", {
                      required: "Detalles es requerido.",
                    })}
                    id="AddressDetails"
                    placeholder="Ingresa los detalles"
                    autoComplete="off"
                  />
                  {errors.details && (
                    <Badge variant="required-error">
                      {errors.details.message}
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
            <Button  type="submit" form="addressForm" variant="confirm-add-button">
              Confirmar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateAddress;
