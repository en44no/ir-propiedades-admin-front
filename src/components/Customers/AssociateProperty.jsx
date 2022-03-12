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
  FormLabel,
  Input,
  Select,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import CustomersContext from "../../context/Customers/CustomersContext";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { RiCloseCircleFill } from "react-icons/ri";

const AssociateProperty = (props) => {
  const { addCustomer, setAssociatedPropertiesPendingToAdd } =
    useContext(CustomersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [propertyCode, setPropertyCode] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [associatedProperties, setAssociatedProperties] = useState([]);

  const associateProperty = (data) => {
    if (propertyCode.trim() != "") {
      let property = {
        code: propertyCode,
        type: propertyType,
      };
      setAssociatedProperties([...associatedProperties, property]);
    }
    setPropertyCode("");
    setPropertyType("");
    //addCustomer(data);
  };

  const removeAssociatedProperty = (propertyCode) => {
    const newAssociatedProperties = associatedProperties.filter(
      (property) => property.code != propertyCode
    );
    setAssociatedProperties(newAssociatedProperties);
  };

  const submitAssociateProperty = () => {
    let ownerProperties = [];
    let tenantProperties = [];
    associatedProperties.forEach((property) => {
      if (property.type === "Dueño") {
        ownerProperties.push(property.code);
      } else if (property.type === "Inquilino") {
        tenantProperties.push(property.code);
      }
    });

    const data = { ownerProperties, tenantProperties };
    setAssociatedPropertiesPendingToAdd(data);
    onClose();
  };

  return (
    <>
      <Button
        w={"100%"}
        onClick={onOpen}
        fontSize="15px"
        leftIcon={<BsFillHouseDoorFill fontSize="18px" />}
        mr={5}
        mb={5}
        borderRadius="9px"
        variant="add-button-clear"
      >
        Asociar propiedades
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
            Asociar propiedades
          </DrawerHeader>
          <DrawerBody color="#fff">
            <Stack spacing="14px">
              <Box>
                <FormLabel htmlFor="CustomerProperty">
                  Código interno de la propiedad
                </FormLabel>
                <Input
                  id="CustomerProperty"
                  placeholder="Ingresa el código"
                  autoComplete="off"
                  value={propertyCode}
                  onChange={(e) => setPropertyCode(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="CustomerProperty">
                  Tipo de vínculo
                </FormLabel>
                <Select
                  id="CustomerType"
                  placeholder="Selecciona el tipo"
                  value={propertyType}
                  onChange={(event) => setPropertyType(event.target.value)}
                >
                  <option value="Dueño" selected>
                    Dueño
                  </option>
                  <option value="Inquilino">Inquilino</option>
                </Select>
              </Box>
              <Box>
                <Button
                  w="100%"
                  type="button"
                  form="CustomerPropertyForm"
                  variant="confirm-add-button"
                  onClick={() => associateProperty()}
                >
                  Agregar
                </Button>
              </Box>
              {associatedProperties.map((property) => (
                <Box
                  key={property.code}
                  bg="defaultColor.500"
                  w="100%"
                  borderRadius="7px"
                  py="0.4rem"
                  display="flex"
                  justifyContent="center"
                  gap="5px"
                  position="relative"
                >
                  <Badge
                    alignSelf="center"
                    position="absolute"
                    left="3"
                    fontSize="0.7rem"
                    borderRadius="7px"
                  >
                    {property.type}
                  </Badge>
                  <Box>{property.code}</Box>
                  <Box
                    alignSelf="center"
                    cursor="pointer"
                    position="absolute"
                    right="3"
                    onClick={() => removeAssociatedProperty(property.code)}
                  >
                    <RiCloseCircleFill fontSize="1.2rem" />
                  </Box>
                </Box>
              ))}
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button
              color="#fff"
              variant="cancel-action"
              mr={3}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              form="CustomerForm"
              variant="confirm-add-button"
              onClick={() => submitAssociateProperty()}
            >
              Confirmar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AssociateProperty;
