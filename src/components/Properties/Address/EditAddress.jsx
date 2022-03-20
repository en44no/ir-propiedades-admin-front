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
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import { useForm } from "react-hook-form";
import { MdLocationPin } from "react-icons/md";

const EditAddress = (props) => {
  const { editAddress } = useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { full, address, direction } = props;
  const [reactiveAddress, setReactiveAddress] = useState(address);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitAddress = (data) => {
    editAddress(data, address._id);
    reset();
    onClose();
  };

  useEffect(() => {
    setReactiveAddress(address);
  }, [address]);

  return (
    <>
      <Button
        w={full === "yes" ? "100%" : "7rem"}
        onClick={onOpen}
        fontSize="15px"
        leftIcon={<MdLocationPin fontSize="18px" />}
        mr={5}
        borderRadius="9px"
        variant="add-button-clear"
      >
        Editar dirección
      </Button>

      <Drawer
        isOpen={isOpen}
        placement={direction ? direction : "left"}
        onClose={onClose}
      >
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
            Editar dirección
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
                    placeholder="Ingresa el país"
                    value={reactiveAddress.country}
                    onChange={(e) =>
                      setReactiveAddress({
                        ...reactiveAddress,
                        country: e.target.value,
                      })
                    }
                  >
                    <option value="argentina">Argentina</option>
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
                    value={reactiveAddress.state}
                    onChange={(e) =>
                      setReactiveAddress({
                        ...reactiveAddress,
                        state: e.target.value,
                      })
                    }
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
                    value={reactiveAddress.city}
                    onChange={(e) =>
                      setReactiveAddress({
                        ...reactiveAddress,
                        city: e.target.value,
                      })
                    }
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
                    value={reactiveAddress.neighborhood}
                    onChange={(e) =>
                      setReactiveAddress({
                        ...reactiveAddress,
                        neighborhood: e.target.value,
                      })
                    }
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
                    value={reactiveAddress.street}
                    onChange={(e) =>
                      setReactiveAddress({
                        ...reactiveAddress,
                        street: e.target.value,
                      })
                    }
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
                    value={reactiveAddress.door}
                    onChange={(e) =>
                      setReactiveAddress({
                        ...reactiveAddress,
                        door: e.target.value,
                      })
                    }
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
                    value={reactiveAddress.details}
                    onChange={(e) =>
                      setReactiveAddress({
                        ...reactiveAddress,
                        details: e.target.value,
                      })
                    }
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
            <Button
              type="submit"
              form="addressForm"
              variant="confirm-add-button"
            >
              Confirmar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default EditAddress;
