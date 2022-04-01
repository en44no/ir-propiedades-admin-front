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
  Textarea,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import PropertiesContext from "../../../context/Properties/PropertiesContext";

const CreateFeature = (props) => {
  const { full, normalAddButton, noRightMargin, property } = props;
  const { addFeature } = useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitFeature = (data) => {
    addFeature(data, property._id);
    reset();
    onClose();
  };

  return (
    <>
      <Button
        id="createFeatures"
        w={full === "yes" ? "100%" : "7rem"}
        onClick={onOpen}
        fontSize="15px"
        leftIcon={<HiPlus fontSize="1.2rem" />}
        mr={noRightMargin ? 0 : 5}
        borderRadius="9px"
        variant={normalAddButton ? "add-button-dark" : "add-button-clear"}
      >
        {normalAddButton ? "Agregar" : "Agregar características"}
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
            Agregar características
          </DrawerHeader>
          <DrawerBody color="#fff">
            <form id="formFeature" onSubmit={handleSubmit(submitFeature)}>
              <Stack spacing="14px">
                <Box>
                  <FormLabel htmlFor="createFeatureType">Tipo</FormLabel>
                  <Select
                    {...register("type", {
                      required: "Tipo es requerido.",
                    })}
                    id="createFeatureType"
                    placeholder="Ingresa el tipo"
                  >
                    <option value="Baño">Baño</option>
                    <option value="Cocina">Cocina</option>
                    <option value="Dormitorio">Dormitorio</option>
                    <option value="Sala de estar">Sala de estar</option>
                    <option value="Garaje">Garaje</option>
                    <option value="Otro">Otro</option>
                  </Select>
                  {errors.type && (
                    <Badge variant="required-error">
                      {errors.type.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="createFeatureTitle">Título</FormLabel>
                  <Input
                    {...register("title", {
                      required: "Título es requerido.",
                    })}
                    id="createFeatureTitle"
                    placeholder="Ingresa el título"
                  ></Input>
                  {errors.title && (
                    <Badge variant="required-error">
                      {errors.title.message}
                    </Badge>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="createFeatureDescription">
                    Descripción
                  </FormLabel>
                  <Textarea
                    {...register("description", {
                      required: "Descripción es requerido.",
                    })}
                    id="createFeatureDescription"
                    placeholder="Ingresa la descripción"
                  ></Textarea>
                  {errors.description && (
                    <Badge variant="required-error">
                      {errors.description.message}
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
              form="formFeature"
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

export default CreateFeature;
