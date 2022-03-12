import React, { useContext } from "react";
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
        <DrawerContent bg="defaultColor.400">
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
                    defaultValue={
                      property.unitMeasurement ? property.unitMeasurement : null
                    }
                  >
                    <option value="m2" selected>
                      Metros cuadrados
                    </option>
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
                    id="surfaceBuilded"
                    type="number"
                    placeholder="Ingresa la superficie construída"
                    defaultValue={
                      property.buildedSurface ? property.buildedSurface : null
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
                    id="surfaceTotal"
                    type="number"
                    placeholder="Ingresa la superficie total"
                    defaultValue={
                      property.totalSurface ? property.totalSurface : null
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
