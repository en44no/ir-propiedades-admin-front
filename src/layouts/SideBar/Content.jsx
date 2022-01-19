import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Content = () => {
  return (
    <>
      <Box px={0} flexGrow="1">
        <Accordion allowMultiple border="transparent">
          <AccordionItem>
            <h2>
              <AccordionButton
                _hover={{
                  borderRadius: "9px",
                  bg: "defaultColor.50",
                }}
                borderRadius="9px"
              >
                <Box flex="1" textAlign="left" fontWeight="500" pb={1}>
                  Propiedades
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              mt="1"
              cursor="pointer"
              pb={2}
              _hover={{
                borderRadius: "9px",
                bg: "defaultColor.50",
              }}
            >
              <Link to="/properties">
                <Text fontSize="0.95rem">Manejo de propiedades</Text>
              </Link>
            </AccordionPanel>
            <AccordionPanel
              mt="1"
              cursor="pointer"
              pb={2}
              _hover={{
                borderRadius: "9px",
                bg: "defaultColor.50",
              }}
            >
              Inventarios
            </AccordionPanel>
            <Divider background="#BABABA" mt="2" mb="2" />
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _hover={{
                  borderRadius: "9px",
                  bg: "defaultColor.50",
                }}
                borderRadius="9px"
              >
                <Box flex="1" textAlign="left" fontWeight="500" pb={1}>
                  Usuarios
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              mt="1"
              cursor="pointer"
              pb={2}
              _hover={{
                borderRadius: "9px",
                bg: "defaultColor.50",
              }}
            >
              <Link to="/users">
                <Text fontSize="0.95rem">Manejo de usuarios</Text>
              </Link>
            </AccordionPanel>
            <Divider background="#BABABA" mt="2" mb="2" />
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _hover={{
                  borderRadius: "9px",
                  bg: "defaultColor.50",
                }}
                borderRadius="9px"
              >
                <Box flex="1" textAlign="left" fontWeight="500" pb={1}>
                  Reportes
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              mt="1"
              cursor="pointer"
              pb={2}
              _hover={{
                borderRadius: "9px",
                bg: "defaultColor.50",
              }}
            >
              <Text fontSize="0.95rem">Alquileres por año</Text>
            </AccordionPanel>
            <Divider background="#BABABA" mt="2" mb="2" />
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default Content;
