import React, { useContext, useEffect, useState } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import ReportsByDate from "../components/Reports/ReportsByDate";
import SpecificClientReport from "../components/Reports/SpecificClientReport";
import SpecificPropertyReport from "../components/Reports/SpecificPropertyReport";
import { FaCalendarCheck } from "react-icons/fa";
import { MdLooksOne } from "react-icons/md";
import ReportsContext from "../context/Reports/ReportsContext";
import SpecificClientsReport from "../components/Reports/SpecificClientsReport";
import Loader from "../components/Other/Loader/Loader";

const ReportsPage = () => {
  const {
    getPropertyWithLargestArea,
    getPropertyWithLessArea,
    getCustomerWithMoreProperties,
    getRentedProperties,
    getSoldProperties,
    getAvailableProperties,
    getInventories,
    getPosts,
    getNewProperties,
    getNewCustomers,
    getCustomersWithoutProperties,
    propertiesFromDB,
  } = useContext(ReportsContext);

  return propertiesFromDB.length > 0 ? (
    <Box mt="0rem" w="100%" h="100%" position="relative">
      <Box
        justifyContent="center"
        fontSize="1rem"
        fontWeight="500"
        display="flex"
        mt="-0.5rem"
        color="defaultColor.400"
      >
        El ícono{" "}
        <Box ml="0.3rem" mr="0.3rem" alignSelf="center">
          <MdLooksOne fontSize="1.2rem" />
        </Box>{" "}
        indica que el reporte es específico para un elemento, mientras que el
        ícono{" "}
        <Box ml="0.3rem" mr="0.3rem" alignSelf="center">
          <FaCalendarCheck fontSize="1rem" />
        </Box>{" "}
        indica que el reporte es por fechas.
      </Box>
      <Box
        bg="#fff"
        border="2px solid"
        borderRadius="7px"
        color="defaultColor.300"
        w="100%"
        p="1rem"
        mb="1rem"
        mt="0.8rem"
      >
        <HStack display="flex" flexWrap="wrap" flexFlow="nowrap" gap="1rem">
          <Text
            position="relative"
            fontSize="1.2rem"
            fontWeight="500"
            ml="1rem"
            maxW="7rem"
            minW="7rem"
            textAlign="center"
          >
            Propiedades
          </Text>
          <Box>
            <ReportsByDate
              todayQuantity={getAvailableProperties().todayQuantity}
              lastWeekQuantity={getAvailableProperties().lastWeekQuantity}
              lastMonthQuantity={getAvailableProperties().lastMonthQuantity}
              lastYearQuantity={getAvailableProperties().lastYearQuantity}
              percentageTodayYesterday={
                getAvailableProperties().percentageTodayYesterday
              }
              percentageLastWeekTwoWeekAgo={
                getAvailableProperties().percentageLastWeekTwoWeekAgo
              }
              percentageLastMonthTwoMonthAgo={
                getAvailableProperties().percentageLastMonthTwoMonthAgo
              }
              percentageLastYearTwoYearsAgo={
                getAvailableProperties().percentageLastYearTwoYearsAgo
              }
              modalTitle="Cantidad de propiedades disponibles"
              buttonText="Disponibles venta y alquiler"
            />
            <ReportsByDate
              todayQuantity={getRentedProperties().todayQuantity}
              lastWeekQuantity={getRentedProperties().lastWeekQuantity}
              lastMonthQuantity={getRentedProperties().lastMonthQuantity}
              lastYearQuantity={getRentedProperties().lastYearQuantity}
              percentageTodayYesterday={
                getRentedProperties().percentageTodayYesterday
              }
              percentageLastWeekTwoWeekAgo={
                getRentedProperties().percentageLastWeekTwoWeekAgo
              }
              percentageLastMonthTwoMonthAgo={
                getRentedProperties().percentageLastMonthTwoMonthAgo
              }
              percentageLastYearTwoYearsAgo={
                getRentedProperties().percentageLastYearTwoYearsAgo
              }
              modalTitle="Cantidad de propiedades alquiladas"
              buttonText="Alquiladas"
            />

            <ReportsByDate
              todayQuantity={getSoldProperties().todayQuantity}
              lastWeekQuantity={getSoldProperties().lastWeekQuantity}
              lastMonthQuantity={getSoldProperties().lastMonthQuantity}
              lastYearQuantity={getSoldProperties().lastYearQuantity}
              percentageTodayYesterday={
                getSoldProperties().percentageTodayYesterday
              }
              percentageLastWeekTwoWeekAgo={
                getSoldProperties().percentageLastWeekTwoWeekAgo
              }
              percentageLastMonthTwoMonthAgo={
                getSoldProperties().percentageLastMonthTwoMonthAgo
              }
              percentageLastYearTwoYearsAgo={
                getSoldProperties().percentageLastYearTwoYearsAgo
              }
              modalTitle="Cantidad de propiedades vendidas"
              buttonText="Vendidas"
            />

            <ReportsByDate
              todayQuantity={getInventories().todayQuantity}
              lastWeekQuantity={getInventories().lastWeekQuantity}
              lastMonthQuantity={getInventories().lastMonthQuantity}
              lastYearQuantity={getInventories().lastYearQuantity}
              percentageTodayYesterday={
                getInventories().percentageTodayYesterday
              }
              percentageLastWeekTwoWeekAgo={
                getInventories().percentageLastWeekTwoWeekAgo
              }
              percentageLastMonthTwoMonthAgo={
                getInventories().percentageLastMonthTwoMonthAgo
              }
              percentageLastYearTwoYearsAgo={
                getInventories().percentageLastYearTwoYearsAgo
              }
              modalTitle="Cantidad de inventarios realizados"
              buttonText="Inventarios"
            />
            <ReportsByDate
              todayQuantity={getPosts().todayQuantity}
              lastWeekQuantity={getPosts().lastWeekQuantity}
              lastMonthQuantity={getPosts().lastMonthQuantity}
              lastYearQuantity={getPosts().lastYearQuantity}
              percentageTodayYesterday={getPosts().percentageTodayYesterday}
              percentageLastWeekTwoWeekAgo={
                getPosts().percentageLastWeekTwoWeekAgo
              }
              percentageLastMonthTwoMonthAgo={
                getPosts().percentageLastMonthTwoMonthAgo
              }
              percentageLastYearTwoYearsAgo={
                getPosts().percentageLastYearTwoYearsAgo
              }
              modalTitle="Cantidad de publicaciones realizadas"
              buttonText="Publicaciones"
            />
            <SpecificPropertyReport
              property={getPropertyWithLargestArea()}
              topText={` Esta propiedad cuenta con una superficie total de 
                          ${getPropertyWithLargestArea().totalSurface} ${
                getPropertyWithLargestArea().unitMeasurement
              }.`}
              modalTitle="Propiedad con mayor superficie"
              buttonText="Mayor superficie"
            />
            <SpecificPropertyReport
              property={getPropertyWithLessArea()}
              topText={` Esta propiedad cuenta con una superficie total de 
                          ${getPropertyWithLessArea().totalSurface} ${
                getPropertyWithLessArea().unitMeasurement
              }.`}
              modalTitle="Propiedad con menor superficie"
              buttonText="Menor superficie"
            />
            <ReportsByDate
              todayQuantity={getNewProperties().todayQuantity}
              lastWeekQuantity={getNewProperties().lastWeekQuantity}
              lastMonthQuantity={getNewProperties().lastMonthQuantity}
              lastYearQuantity={getNewProperties().lastYearQuantity}
              percentageTodayYesterday={
                getNewProperties().percentageTodayYesterday
              }
              percentageLastWeekTwoWeekAgo={
                getNewProperties().percentageLastWeekTwoWeekAgo
              }
              percentageLastMonthTwoMonthAgo={
                getNewProperties().percentageLastMonthTwoMonthAgo
              }
              percentageLastYearTwoYearsAgo={
                getNewProperties().percentageLastYearTwoYearsAgo
              }
              modalTitle="Cantidad de propiedades agregadas al sistema"
              buttonText="Nuevas"
            />
          </Box>
        </HStack>
      </Box>
      <Box
        bg="#fff"
        border="2px solid"
        borderRadius="7px"
        color="defaultColor.300"
        w="100%"
        p="1rem"
        mb="1rem"
      >
        <HStack display="flex" flexWrap="wrap" flexFlow="nowrap" gap="1rem">
          <Text
            position="relative"
            fontSize="1.2rem"
            fontWeight="500"
            ml="1rem"
            maxW="7rem"
            minW="7rem"
            textAlign="center"
          >
            Clientes
          </Text>
          <Box>
            <ReportsByDate
              todayQuantity={getNewCustomers().todayQuantity}
              lastWeekQuantity={getNewCustomers().lastWeekQuantity}
              lastMonthQuantity={getNewCustomers().lastMonthQuantity}
              lastYearQuantity={getNewCustomers().lastYearQuantity}
              percentageTodayYesterday={
                getNewCustomers().percentageTodayYesterday
              }
              percentageLastWeekTwoWeekAgo={
                getNewCustomers().percentageLastWeekTwoWeekAgo
              }
              percentageLastMonthTwoMonthAgo={
                getNewCustomers().percentageLastMonthTwoMonthAgo
              }
              percentageLastYearTwoYearsAgo={
                getNewCustomers().percentageLastYearTwoYearsAgo
              }
              modalTitle="Clientes registrados"
              buttonText="Registrados"
            />
            <SpecificClientReport
              customer={getCustomerWithMoreProperties()}
              modalTitle="Cliente con mayor cantidad de propiedades"
              buttonText="Más propiedades"
            />
            <SpecificClientsReport
              customers={getCustomersWithoutProperties()}
              modalTitle="Clientes sin propiedades"
              buttonText="Sin propiedades"
              topText="Estos son los clientes que no tienen propiedades registradas en el sistema."
            />
          </Box>
        </HStack>
      </Box>
    </Box>
  ) : (
    <Box h="100%" display="flex" justifyContent="center" alignItems="center">
      <Loader />
    </Box>
  );
};

export default ReportsPage;
