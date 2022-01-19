import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import PropertyCard from "../components/Properties/PropertyCard";
import CreateProperty from "../components/Properties/CreateProperty";
import PropertiesContext from "../context/PropertiesContext";

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
        {properties.map((property) => (
          <Box key={property._id}>
            <PropertyCard property={property} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default PropertiesPage;
