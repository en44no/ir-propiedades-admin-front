import React, { useContext, useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import PropertiesContext from "../context/Properties/PropertiesContext";
import CreateProperty from "../components/Properties/Property/CreateProperty";
import PropertyCard from "../components/Properties/Property/Card/PropertyCard";
import Search from "../components/Other/Search";
import Loader from "../components/Other/Loader/Loader";

const PropertiesPage = () => {
  const { properties, propertiesAreLoading } = useContext(PropertiesContext);
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  return (
    <>
      <Box ml="1rem" display="flex" justifyContent="end">
        <Search
          placeHolder="Busca propiedades según nombre, tipo, descripción, dirección, comentarios y código interno..."
          listToFilter={properties}
          filters={[
            "name",
            "type",
            "description",
            "address.city",
            "address.country",
            "address.neighborhood",
            "address.state",
            "address.street",
            "comment",
            "internalCode",
          ]}
          listSetter={setFilteredProperties}
        />
        <CreateProperty />
      </Box>
      {propertiesAreLoading == true ? (
        <Box
          h="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Loader />
        </Box>
      ) : (
        <Box
          position="relative"
          className="allProperties"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          mt="0rem"
          overflowY="auto"
          height="90%"
        >
          {properties &&
            filteredProperties.map((property) => (
              <Box key={property._id}>
                <PropertyCard property={property} image={property.media[0]} />
              </Box>
            ))}

          {properties.length === 0 && (
            <Text
              fontSize="xl"
              color="#000"
              position="absolute"
              top="0"
              left="0"
              display="flex"
              w="100%"
              h="100%"
              justifyContent="center"
              alignItems="center"
              mt="-5rem"
            >
              El sistema aún no cuenta con propiedades registradas.
            </Text>
          )}

          {filteredProperties.length === 0 && properties.length !== 0 && (
            <Text
              fontSize="xl"
              color="#000"
              position="absolute"
              top="0"
              left="0"
              display="flex"
              w="100%"
              h="100%"
              justifyContent="center"
              alignItems="center"
              mt="-5rem"
            >
              No se encontraron propiedades que coincidan con tu búsqueda.
            </Text>
          )}
        </Box>
      )}
    </>
  );
};

export default PropertiesPage;
