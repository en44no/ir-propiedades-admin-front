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
import PropertiesContext from "../../context/Properties/PropertiesContext";

const AssociateProperty = (props) => {
  const { setAssociatedPropertiesPendingToAdd } = useContext(CustomersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { properties } = useContext(PropertiesContext);
  const [propertyCode, setPropertyCode] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [associatedProperties, setAssociatedProperties] = useState([]);
  const [showError, setShowError] = useState(false);
  const [showErrorTypeIsRequired, setShowErrorTypeIsRequired] = useState(false);
  const [showCustomerAlreadyHasThatProp, setShowCustomerAlreadyHasThatProp] =
    useState(false);
  const [showNoPropWithThatCodeError, setShowNoPropWithThatCodeError] =
    useState(false);

  const associateProperty = (data) => {
    if (propertyCode.trim() != "") {
      if (propertyType == "") {
        setShowErrorTypeIsRequired(true);
      } else {
        setShowErrorTypeIsRequired(false);
        if (
          associatedProperties.find(
            (property) => property.code === propertyCode
          )
        ) {
          setShowCustomerAlreadyHasThatProp(true);
        } else {
          if (
            properties.find(
              (property) => property.internalCode === propertyCode
            )
          ) {
            let property = {
              code: propertyCode,
              type: propertyType,
            };
            setAssociatedProperties([...associatedProperties, property]);
            setPropertyCode("");
            setPropertyType("");
          } else {
            setShowNoPropWithThatCodeError(true);
          }
        }
      }
    } else {
      setShowError(true);
    }
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
      if (property.type === "Due??o") {
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
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          borderLeft="1px white solid"
          bg="defaultColor.400"
          borderStartStartRadius="7px"
          borderEndStartRadius="7px"
        >
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
                  C??digo interno de la propiedad
                </FormLabel>
                <Input
                  id="CustomerProperty"
                  placeholder="Ingresa el c??digo"
                  autoComplete="off"
                  type="number"
                  value={propertyCode}
                  onChange={(e) => {
                    setPropertyCode(e.target.value);
                    setShowError(false);
                    setShowNoPropWithThatCodeError(false);
                    setShowCustomerAlreadyHasThatProp(false);
                  }}
                />
                <Badge
                  display={showError ? "inline-block" : "none"}
                  id="requiredAddress"
                  mt="0.3rem"
                  variant="required-error"
                >
                  El c??digo interno es requerido.
                </Badge>
                <Badge
                  whiteSpace="inital"
                  display={
                    showCustomerAlreadyHasThatProp ? "inline-block" : "none"
                  }
                  id="requiredAddress"
                  mt="0.3rem"
                  variant="required-error"
                >
                  El cliente ya tiene esta propiedad registrada.
                </Badge>
                <Badge
                  display={
                    showNoPropWithThatCodeError ? "inline-block" : "none"
                  }
                  id="requiredAddress"
                  mt="0.3rem"
                  variant="required-error"
                >
                  No hay propiedades con ese c??digo.
                </Badge>
              </Box>
              <Box>
                <FormLabel htmlFor="CustomerProperty">
                  Tipo de v??nculo
                </FormLabel>
                <Select
                  id="CustomerType"
                  placeholder="Selecciona el tipo"
                  value={propertyType}
                  onChange={(event) => {
                    setPropertyType(event.target.value);
                    setShowErrorTypeIsRequired(false);
                  }}
                >
                  <option value="Due??o" selected>
                    Due??o
                  </option>
                  <option value="Inquilino">Inquilino</option>
                </Select>
                <Badge
                  display={showErrorTypeIsRequired ? "inline-block" : "none"}
                  id="requiredAddress"
                  mt="0.3rem"
                  variant="required-error"
                >
                  El tipo de v??nculo es requerido.
                </Badge>
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
