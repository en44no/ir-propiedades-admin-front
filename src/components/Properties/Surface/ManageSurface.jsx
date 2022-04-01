import React, { useContext, useEffect, useState } from "react";
import {
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
  Badge,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BsRulers } from "react-icons/bs";
import PropertiesContext from "../../../context/Properties/PropertiesContext";

const ManageSurface = (props) => {
  const { full, normalAddButton, noRightMargin, property } = props;
  const { addSurfaceToProperty } = useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reactiveProperty, setReactiveProperty] = useState(property);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitSurface = (data) => {
    addSurfaceToProperty(data, property._id);
    reset();
    onClose();
  };

  useEffect(() => {
    setReactiveProperty(property);
  }, [property]);

  return (
    <>
      <Button
        id="submitSurface"
        w={full === "yes" ? "100%" : "7rem"}
        onClick={onOpen}
        fontSize="15px"
        leftIcon={<BsRulers fontSize="1.2rem" />}
        mr={noRightMargin ? 0 : 5}
        borderRadius="9px"
        variant={normalAddButton ? "add-button-dark" : "add-button-clear"}
      >
        Gestionar superficie
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
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
            Gestionar superficie
          </DrawerHeader>
          <DrawerBody color="#fff">
            <form id="manageSurfaceForm" onSubmit={handleSubmit(submitSurface)}>
              <Stack spacing="14px">
                <Box>
                  <FormLabel htmlFor="surfaceUnitMeasurement">
                    Unidad de medida
                  </FormLabel>
                  <Select
                    {...register("unitMeasurement", {
                      required: "Unidad de medida es requerida.",
                    })}
                    id="surfaceUnitMeasurement"
                    placeholder="Ingresa la unidad"
                    value={reactiveProperty.unitMeasurement}
                    onChange={(e) =>
                      setReactiveProperty({
                        ...reactiveProperty,
                        unitMeasurement: e.target.value,
                      })
                    }
                  >
                    <option value="m2">Metros cuadrados</option>
                    <option value="ha">Hectáreas</option>
                  </Select>
                  {errors.type && (
                    <Badge variant="required-error">
                      {errors.type.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="surfaceBuilded">
                    Superficie construída
                  </FormLabel>
                  <Input
                    {...register("buildedSurface", {
                      required: "Superficie construída es requerida.",
                    })}
                    type="number"
                    id="surfaceBuilded"
                    placeholder="Ingresa la superficie construída"
                    value={reactiveProperty.buildedSurface}
                    onChange={(e) =>
                      setReactiveProperty({
                        ...reactiveProperty,
                        buildedSurface: e.target.value,
                      })
                    }
                  ></Input>
                  {errors.title && (
                    <Badge variant="required-error">
                      {errors.title.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="surfaceTotal">Superficie total</FormLabel>
                  <Input
                    {...register("totalSurface", {
                      required: "Superficie total es requerida.",
                    })}
                    type="number"
                    id="surfaceTotal"
                    placeholder="Ingresa la superficie total"
                    value={reactiveProperty.totalSurface}
                    onChange={(e) =>
                      setReactiveProperty({
                        ...reactiveProperty,
                        totalSurface: e.target.value,
                      })
                    }
                  ></Input>
                  {errors.title && (
                    <Badge variant="required-error">
                      {errors.title.message}
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
              form="manageSurfaceForm"
              type="submit"
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

export default ManageSurface;
