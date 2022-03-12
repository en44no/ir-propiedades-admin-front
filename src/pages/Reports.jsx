import React from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Box,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";

const ReportsPage = () => {
  const formatDate = () => {
    const newDate = new Date();
    return newDate.toLocaleDateString("en-GB");
  };

  return (
    <Box mt="0rem" w="100%" h="100%" textAlign="center" position="relative">
      <Text
        position="absolute"
        right="0.4rem"
        top="1rem"
        fontSize="1.1rem"
        fontWeight="500"
      >
        Hoy es {formatDate()}
      </Text>
      <HStack w="100%" justifyContent="center" mb="1rem">
        <Button variant="reports-button" bg="defaultColor.400" color="#fff">
          Propiedades disponibles
        </Button>
        <Button variant="reports-button" bg="defaultColor.400" color="#fff">
          Clientes registrados
        </Button>
      </HStack>
      <Box
        borderRadius="7px"
        border="2px solid"
        p="1rem"
        color="defaultColor.300"
        mb="1rem"
      >
        <StatGroup alignItems="center">
          <Text
            position="relative"
            fontSize="1.3rem"
            fontWeight="500"
            ml="1rem"
            maxW="10rem"
            minW="10rem"
          >
            A día de hoy
          </Text>
          <Stat>
            <StatLabel>Propiedades disponibles para alquilar</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36% en comparación a ayer
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Propiedades disponibles para vender</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05% en comparación a ayer
            </StatHelpText>
          </Stat>
        </StatGroup>
      </Box>
      <Box
        borderRadius="7px"
        border="2px solid"
        p="1rem"
        color="defaultColor.300"
        mb="1rem"
      >
        <StatGroup alignItems="center">
          <Text
            position="relative"
            fontSize="1.3rem"
            fontWeight="500"
            ml="1rem"
            maxW="10rem"
            minW="10rem"
          >
            En la última semana
          </Text>
          <Stat>
            <StatLabel>Propiedades disponibles para alquilar</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36% en comparación a la semana pasada
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Propiedades disponibles para vender</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05% en comparación a la semana pasada
            </StatHelpText>
          </Stat>
        </StatGroup>
      </Box>
      <Box
        borderRadius="7px"
        border="2px solid"
        p="1rem"
        color="defaultColor.300"
        mb="1rem"
      >
        <StatGroup alignItems="center">
          <Text
            position="relative"
            fontSize="1.3rem"
            fontWeight="500"
            ml="1rem"
            maxW="10rem"
            minW="10rem"
          >
            En el último mes
          </Text>
          <Stat>
            <StatLabel>Propiedades disponibles para alquilar</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36% en comparación al mes anterior
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Propiedades disponibles para vender</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05% en comparación al mes anterior
            </StatHelpText>
          </Stat>
        </StatGroup>
      </Box>
      <Box
        borderRadius="7px"
        border="2px solid"
        p="1rem"
        color="defaultColor.300"
        mb="1rem"
      >
        <StatGroup alignItems="center">
          <Text
            position="relative"
            fontSize="1.3rem"
            fontWeight="500"
            ml="1rem"
            maxW="10rem"
            minW="10rem"
          >
            Este año
          </Text>
          <Stat>
            <StatLabel>Propiedades disponibles para alquilar</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36% en comparación al año anterior
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Propiedades disponibles para vender</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05% en comparación al año anterior
            </StatHelpText>
          </Stat>
        </StatGroup>
      </Box>
    </Box>
  );
};

export default ReportsPage;
