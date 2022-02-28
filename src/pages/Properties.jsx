import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import PropertiesContext from "../context/Properties/PropertiesContext";
import Loader from "../components/Other/Loader/Loader";
import CreateProperty from "../components/Properties/Property/CreateProperty";
import PropertyCard from "../components/Properties/Property/Card/PropertyCard";

const PropertiesPage = () => {
  const { properties } = useContext(PropertiesContext);

  return (
    <>
      <Box display="flex" justifyContent="end" mr="2.2rem">
        <CreateProperty />
      </Box>
      <Box
        className="allProperties"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        mt="0rem"
        overflowY="auto"
        height="90%"
      >
        {properties.length > 0 ? (
          properties.map((property) => (
            <Box key={property._id}>
              <PropertyCard property={property} image={property.media[0]} />
            </Box>
          ))
        ) : (
          <Loader />
        )}
      </Box>
    </>
  );
};

export default PropertiesPage;
