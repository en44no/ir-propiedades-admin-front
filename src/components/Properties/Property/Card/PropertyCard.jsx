import React from "react";
import { Badge, Box, HStack, Image, Tooltip } from "@chakra-ui/react";
import PropertyDetails from "../PropertyDetails";
import BadgePropertyCard from "./BadgePropertyCard";
import { BsHouseDoorFill } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { MdApartment, MdCheck, MdClose, MdLocationPin } from "react-icons/md";
import CopyInternalCode from "../../CopyInternalCode";
import NoImage from "../../../../assets/no-image.jpg";

const PropertyCard = (props) => {
  const { property, image } = props;

  const parsePropertyType = () => {
    if (property.type[0] === "Casa") {
      return <BadgePropertyCard title="Casa" icon={<BsHouseDoorFill />} />;
    } else if (property.type[0] === "Apartamento") {
      return <BadgePropertyCard title="Apartamento" icon={<MdApartment />} />;
    } else if (property.type[0] === "Depósito") {
      return <BadgePropertyCard title="Depósito" icon={<FaWarehouse />} />;
    }
  };

  return (
    <>
      <Box
        minW="270px"
        maxW="270px"
        outline="2px solid #cacaca"
        mt="2px"
        borderRadius="lg"
        overflow="hidden"
        mb="4"
        mr="4"
        position="relative"
      >
        <PropertyDetails propertyName={property.name} property={property} />
        <Image
          minW="270px"
          maxW="270px"
          minH="170px"
          maxH="170px"
          src={image ? image.url : NoImage}
          alt={property.imageAlt}
          loading="lazy"
          objectFit="cover"
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
            <Box mr="1" fontSize="0.9rem" ml="-0.5" mt="-1px">
              <MdLocationPin />
            </Box>
            {property.address.neighborhood.length > 15 ? (
              <Tooltip
                hasArrow
                label={property.address.neighborhood}
                bg="defaultColor.500"
              >
                <Box>
                  {property.address.neighborhood.slice(0, 15).concat("...")}
                </Box>
              </Tooltip>
            ) : (
              <Box>{property.address.neighborhood}</Box>
            )}
            {","}
            {property.address.city.length > 15 ? (
              <Tooltip
                hasArrow
                label={property.address.city}
                bg="defaultColor.500"
              >
                <Box>{property.address.city.slice(0, 15).concat("...")}</Box>
              </Tooltip>
            ) : (
              <Box ml="1">{property.address.city}</Box>
            )}
          </Box>
          <Box mt="1" mb="2.5" fontWeight="semibold" as="h4" lineHeight="tight">
            {property.description.length > 27 ? (
              <Tooltip
                hasArrow
                label={property.description}
                bg="defaultColor.500"
              >
                <Box>{property.description.slice(0, 27).concat("...")}</Box>
              </Tooltip>
            ) : (
              <Box>{property.description}</Box>
            )}
          </Box>
          <HStack spacing="4px" mt="2">
            <Badge
              borderRadius="7px"
              alignItems="center"
              display="flex"
              px="2"
              py="0.5"
              bg="defaultColor.400"
              color="#fff"
            >
              <CopyInternalCode
                text="propiedad"
                iconSize="0.9rem"
                internalCode={
                  property.internalCode ? property.internalCode : "CÓDIGO"
                }
                noMarginLeft="true"
              />
            </Badge>
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
