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
        <Accordion
          className="accordionSideBar"
          allowMultiple
          border="transparent"
          maxH="24rem"
          overflowY="auto"
        >
          <AccordionItem pt="0" m="3" borderBottom="2px solid #cacaca" pb="1">
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
              _focusWithin={{
                boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
                borderRadius: "9px",
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
              _focusWithin={{
                boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
                borderRadius: "9px",
              }}
              _hover={{
                borderRadius: "9px",
                bg: "defaultColor.50",
              }}
            >
              <Link to="/">
                <Text fontSize="0.95rem">Inventarios</Text>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem m="3" pt="1" borderBottom="2px solid #cacaca" pb="1">
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
              _focusWithin={{
                boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
                borderRadius: "9px",
              }}
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
          <AccordionItem m="3" pt="1" borderBottom="2px solid #cacaca" pb="1">
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
              _focusWithin={{
                boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
                borderRadius: "9px",
              }}
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
            m="3"
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
              _focusWithin={{
                boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
                borderRadius: "9px",
              }}
              _hover={{
                borderRadius: "9px",
                bg: "defaultColor.50",
              }}
            >
              <Link to="/">
                <Text fontSize="0.95rem">Alquileres por año</Text>
              </Link>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default Content;
