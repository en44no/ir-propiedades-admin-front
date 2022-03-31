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
    getAvailableProperties,
    getCustomersWithoutProperties,
    getRentedProperties,
    getSoldProperties,
    getInventories,
    getNewProperties,
    getNewCustomers,
    getPosts,
    propertiesFromDB,
  } = useContext(ReportsContext);

  const [rentedProperties, setRentedProperties] = useState({});
  const [soldProperties, setSoldProperties] = useState({});
  const [availableProperties, setAvailableProperties] = useState({});
  const [inventories, setInventories] = useState({});
  const [posts, setPosts] = useState({});
  const [newProperties, setNewProperties] = useState({});
  const [newCustomers, setNewCustomers] = useState({});
  const [customersWithoutProperties, setCustomersWithoutProperties] = useState(
    []
  );

  useEffect(() => {
    let availablePropertiesR = getAvailableProperties();
    setAvailableProperties(availablePropertiesR);

    let rentedPropertiesR = getRentedProperties();
    setRentedProperties(rentedPropertiesR);

    let soldPropertiesR = getSoldProperties();
    setSoldProperties(soldPropertiesR);
    let inventoriesR = getInventories();
    setInventories(inventoriesR);

    let postsR = getPosts();
    setPosts(postsR);

    let newPropertiesR = getNewProperties();
    setNewProperties(newPropertiesR);

    let newCustomersR = getNewCustomers();
    setNewCustomers(newCustomersR);

    let customersWithoutPropertiesR = getCustomersWithoutProperties();
    setCustomersWithoutProperties(customersWithoutPropertiesR);
  }, []);

  return propertiesFromDB.length > 0 ? (
    <Box mt="0rem" w="100%" h="100%" position="relative">
      <Text
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
      </Text>
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
              todayQuantity={availableProperties.todayQuantity}
              lastWeekQuantity={availableProperties.lastWeekQuantity}
              lastMonthQuantity={availableProperties.lastMonthQuantity}
              lastYearQuantity={availableProperties.lastYearQuantity}
              percentageTodayYesterday={
                availableProperties.percentageTodayYesterday
              }
              percentageLastWeekTwoWeekAgo={
                availableProperties.percentageLastWeekTwoWeekAgo
              }
              percentageLastMonthTwoMonthAgo={
                availableProperties.percentageLastMonthTwoMonthAgo
              }
              percentageLastYearTwoYearsAgo={
                availableProperties.percentageLastYearTwoYearsAgo
              }
              modalTitle="Cantidad de propiedades disponibles"
              buttonText="Disponibles venta y alquiler"
            />
            <ReportsByDate
              todayQuantity={rentedProperties.todayQuantity}
              lastWeekQuantity={rentedProperties.lastWeekQuantity}
              lastMonthQuantity={rentedProperties.lastMonthQuantity}
              lastYearQuantity={rentedProperties.lastYearQuantity}
              percentageTodayYesterday={
                rentedProperties.percentageTodayYesterday
              }
              percentageLastWeekTwoWeekAgo={
                rentedProperties.percentageLastWeekTwoWeekAgo
              }
              percentageLastMonthTwoMonthAgo={
                rentedProperties.percentageLastMonthTwoMonthAgo
              }
              percentageLastYearTwoYearsAgo={
                rentedProperties.percentageLastYearTwoYearsAgo
              }
              modalTitle="Cantidad de propiedades alquiladas"
              buttonText="Alquiladas"
            />

            <ReportsByDate
              todayQuantity={soldProperties.todayQuantity}
              lastWeekQuantity={soldProperties.lastWeekQuantity}
              lastMonthQuantity={soldProperties.lastMonthQuantity}
              lastYearQuantity={soldProperties.lastYearQuantity}
              percentageTodayYesterday={soldProperties.percentageTodayYesterday}
              percentageLastWeekTwoWeekAgo={
                soldProperties.percentageLastWeekTwoWeekAgo
              }
              percentageLastMonthTwoMonthAgo={
                soldProperties.percentageLastMonthTwoMonthAgo
              }
              percentageLastYearTwoYearsAgo={
                soldProperties.percentageLastYearTwoYearsAgo
              }
              modalTitle="Cantidad de propiedades vendidas"
              buttonText="Vendidas"
            />

            <ReportsByDate
              todayQuantity={inventories.todayQuantity}
              lastWeekQuantity={inventories.lastWeekQuantity}
              lastMonthQuantity={inventories.lastMonthQuantity}
              lastYearQuantity={inventories.lastYearQuantity}
              percentageTodayYesterday={inventories.percentageTodayYesterday}
              percentageLastWeekTwoWeekAgo={
                inventories.percentageLastWeekTwoWeekAgo
              }
              percentageLastMonthTwoMonthAgo={
                inventories.percentageLastMonthTwoMonthAgo
              }
              percentageLastYearTwoYearsAgo={
                inventories.percentageLastYearTwoYearsAgo
              }
              modalTitle="Cantidad de inventarios realizados"
              buttonText="Inventarios"
            />
            <ReportsByDate
              todayQuantity={posts.todayQuantity}
              lastWeekQuantity={posts.lastWeekQuantity}
              lastMonthQuantity={posts.lastMonthQuantity}
              lastYearQuantity={posts.lastYearQuantity}
              percentageTodayYesterday={posts.percentageTodayYesterday}
              percentageLastWeekTwoWeekAgo={posts.percentageLastWeekTwoWeekAgo}
              percentageLastMonthTwoMonthAgo={
                posts.percentageLastMonthTwoMonthAgo
              }
              percentageLastYearTwoYearsAgo={
                posts.percentageLastYearTwoYearsAgo
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
              todayQuantity={newProperties.todayQuantity}
              lastWeekQuantity={newProperties.lastWeekQuantity}
              lastMonthQuantity={newProperties.lastMonthQuantity}
              lastYearQuantity={newProperties.lastYearQuantity}
              percentageTodayYesterday={newProperties.percentageTodayYesterday}
              percentageLastWeekTwoWeekAgo={
                newProperties.percentageLastWeekTwoWeekAgo
              }
              percentageLastMonthTwoMonthAgo={
                newProperties.percentageLastMonthTwoMonthAgo
              }
              percentageLastYearTwoYearsAgo={
                newProperties.percentageLastYearTwoYearsAgo
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
              todayQuantity={newCustomers.todayQuantity}
              lastWeekQuantity={newCustomers.lastWeekQuantity}
              lastMonthQuantity={newCustomers.lastMonthQuantity}
              lastYearQuantity={newCustomers.lastYearQuantity}
              percentageTodayYesterday={newCustomers.percentageTodayYesterday}
              percentageLastWeekTwoWeekAgo={
                newCustomers.percentageLastWeekTwoWeekAgo
              }
              percentageLastMonthTwoMonthAgo={
                newCustomers.percentageLastMonthTwoMonthAgo
              }
              percentageLastYearTwoYearsAgo={
                newCustomers.percentageLastYearTwoYearsAgo
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
              customers={customersWithoutProperties}
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
