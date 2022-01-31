import React from "react";
import { Badge, Box, Button, HStack, Image } from "@chakra-ui/react";
import PropertyDetails from "../PropertyDetails";
import BadgePropertyCard from "./BadgePropertyCard";
import { BsHouseDoorFill } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { MdApartment, MdCheck, MdClose, MdLocationPin } from "react-icons/md";

const PropertyCard = (props) => {
  const { property } = props;

  const parsePropertyType = () => {
    if (property.type[0] === "House") {
      return <BadgePropertyCard title="Casa" icon={<BsHouseDoorFill />} />;
    } else if (property.type[0] === "Apartment") {
      return <BadgePropertyCard title="Apartamento" icon={<MdApartment />} />;
    } else if (property.type[0] === "Deposit") {
      return <BadgePropertyCard title="Depósito" icon={<FaWarehouse />} />;
    }
  };

  return (
    <>
      <Box
        minW="270px"
        maxW="270px"
        h="17.5rem"
        border="2px solid #e3e3e3"
        borderRadius="lg"
        overflow="hidden"
        mb="4"
        mr="4"
        position="relative"
      >
        <PropertyDetails propertyName={property.name} property={property} />
        <Image
          src="https://images7.alphacoders.com/344/thumb-1920-344344.jpg"
          alt={property.imageAlt}
        />
        <Box py="3" px="3">
          <Box position="absolute" p="0" left="2" top="2">
            {parsePropertyType()}
          </Box>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            display="flex"
            alignItems="center"
          >
            <Box mr="1" fontSize="0.9rem" ml="-1">
              <MdLocationPin />
            </Box>
            {property.address.neighborhood} , {property.address.city}
          </Box>
          <Box
            mt="1"
            mb="2.5"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {property.description}
          </Box>
          <HStack spacing="10px" mt="2">
            {property.isForSale ? (
              <Badge
                borderRadius="7px"
                alignItems="center"
                display="flex"
                px="2"
                py="0.5"
                colorScheme="green"
              >
                <Box mr="1" fontSize="0.9rem">
                  <MdCheck />
                </Box>
                Venta
              </Badge>
            ) : (
              <Badge
                borderRadius="7px"
                alignItems="center"
                display="flex"
                px="2"
                py="0.5"
                colorScheme="red"
              >
                <Box mr="1" fontSize="0.9rem">
                  <MdClose />
                </Box>
                Venta
              </Badge>
            )}
            {property.isForRent ? (
              <Badge
                borderRadius="7px"
                alignItems="center"
                display="flex"
                px="2"
                py="0.5"
                colorScheme="green"
              >
                <Box mr="1" fontSize="0.9rem">
                  <MdCheck />
                </Box>
                Alquiler
              </Badge>
            ) : (
              <Badge
                borderRadius="7px"
                alignItems="center"
                display="flex"
                px="2"
                py="0.5"
                colorScheme="red"
              >
                <Box mr="1" fontSize="0.9rem">
                  <MdClose />
                </Box>
                Alquiler
              </Badge>
            )}
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default PropertyCard;