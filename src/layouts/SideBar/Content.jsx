import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Content = () => {
  return (
    <>
      <Box px={0} flexGrow="1">
        <Accordion allowMultiple border="transparent">
          <AccordionItem pt="0" borderBottom="2px solid #cacaca" pb="1">
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
              <Text fontSize="0.95rem">Inventarios</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem pt="1" borderBottom="2px solid #cacaca" pb="1">
            <h2>
              <AccordionButton
                _hover={{
                  borderRadius: "9px",
                  bg: "defaultColor.50",
                }}
                borderRadius="9px"
              >
                <Box flex="1" textAlign="left" fontWeight="500" pb={1}>
                  Clientes
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
              <Link to="/customers">
                <Text fontSize="0.95rem">Manejo de clientes</Text>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem pt="1" borderBottom="2px solid #cacaca" pb="1">
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
          </AccordionItem>
          <AccordionItem
            pt="1"
            borderBottom="2px solid #cacaca"
            pb="1"
            borderBottomWidth="2px !important"
          >
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
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default Content;
