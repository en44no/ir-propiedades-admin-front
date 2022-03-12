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
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import PropertiesContext from "../../../context/Properties/PropertiesContext";

const EditFeature = (props) => {
  const { property, feature } = props;
  const { editFeature } = useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitFeature = (data) => {
    editFeature(data, feature._id, property._id);
    reset();
    onClose();
  };

  return (
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
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="defaultColor.400">
          <DrawerCloseButton
            _focus={{ boxShadow: "none" }}
            color="#fff"
            mt="2"
          />
          <DrawerHeader color="#fff" borderBottomWidth="1px">
            Editar característica
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
                    defaultValue={feature.type}
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
                    defaultValue={feature.title}
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
                    defaultValue={feature.description}
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

export default EditFeature;
