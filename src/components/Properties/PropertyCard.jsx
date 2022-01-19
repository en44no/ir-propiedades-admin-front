import React from "react";
import { Box, Image, Badge } from "@chakra-ui/react";
import PropertyDetails from "./PropertyDetails";

const PropertyCard = (props) => {
  const { property } = props;

  const parsePropertyType = () => {
    if (property.type[0] === "House") {
      return "Casa";
    } else if (property.type[0] === "Apartment") {
      return "Apartamento";
    } else if (property.type[0] === "Deposit") {
      return "Depósito";
    }
  };

  return (
    <>
      <Box
        minW="270px"
        maxW="270px"
        h="17rem"
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
        <Box py="5" px="3">
          <Box display="flex" alignItems="baseline">
            <Badge
              borderRadius="7px"
              ml="-0.5"
              px="2"
              bg="defaultColor.300"
              color="#fff"
            >
              {parsePropertyType()}
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {property.address.neighborhood} , {property.address.city}
            </Box>
          </Box>
          <Box
            mt="3"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {property.description}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PropertyCard;
