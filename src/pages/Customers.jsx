import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  HStack,
  Text,
  Container,
} from "@chakra-ui/react";
import CreateCustomer from "../components/Customers/CreateCustomer";
import CustomersContext from "../context/Customers/CustomersContext";
import Loader from "../components/Other/Loader/Loader";
import EditCustomer from "../components/Customers/EditCustomer";
import ConfirmDelete from "../components/Other/ConfirmDelete";
import ViewCustomerProperties from "../components/Customers/ViewCustomerProperties";
import Search from "../components/Other/Search";

const CustomersPage = () => {
  const { customers, deleteCustomer } = useContext(CustomersContext);
    const [filteredCustomers, setFilteredCustomers] = useState(customers);

  useEffect(() => {
    setFilteredCustomers(customers);
    console.log(customers)
    console.log(filteredCustomers)
  }, [customers]);

  const getCustomerProperties = (customer) => {
    let properties = customer.ownerProperties.concat(customer.tenantProperties);
    if (properties.length > 0) {
      let ownerProperties = customer.ownerProperties;
      let tenantProperties = customer.tenantProperties;
      return (
        <ViewCustomerProperties
          ownerProperties={ownerProperties}
          tenantProperties={tenantProperties}
          customer={customer}
        />
      );
    } else {
      return <Text>Sin propiedades</Text>;
    }
  };

  return (
    <>
        <Box ml='1rem' display="flex" justifyContent="end">
          <Search
            placeHolder='Busca clientes según nombre, email y teléfono...'
            listToFilter={filteredCustomers}
            filters={[
              "name",
              "email",
              "phone",
            ]}
            listSetter={setFilteredCustomers}
          />
             <CreateCustomer />
        </Box>
      {customers ? (
        <Table variant="unstyled" size="sm">
          {filteredCustomers.length > 0 && (
            <Thead>
              <Tr maxWidth="100%">
                <Th fontSize="14px" textAlign="center" maxWidth="50px">
                  Nombre
                </Th>
                <Th fontSize="14px" textAlign="center" maxWidth="50px">
                  Email
                </Th>
                <Th fontSize="14px" textAlign="center" maxWidth="50px">
                  Telefono
                </Th>
                <Th fontSize="14px" textAlign="center" maxWidth="50px">
                  Propiedades
                </Th>
                <Th fontSize="14px" textAlign="center" maxWidth="60px">
                  Opciones
                </Th>
              </Tr>
            </Thead>
          )}

          <Tbody>
            {filteredCustomers.map((customer) => (
              <Tr key={customer._id}>
                <Td textAlign="center" maxWidth="70px">
                  {customer.name}
                </Td>
                <Td textAlign="center" maxWidth="80px">
                  {customer.email}
                </Td>
                <Td textAlign="center" maxWidth="50px">
                  {customer.phone}
                </Td>
                <Td textAlign="center" maxWidth="60px">
                  {getCustomerProperties(customer)}
                </Td>
                <Td textAlign="center" maxWidth="70px">
                  <HStack justifyContent="center">
                    <EditCustomer customer={customer} />
                    <Box pb="0rem" textAlign="center" fontWeight="500">
                      <ConfirmDelete
                        text="¿Estás seguro de que deseas eliminar este cliente?"
                        name="cliente"
                        onlyIcon="yes"
                        icon="userIcon"
                        noMarginTopInIcon="yes"
                        functionToExecute={deleteCustomer}
                        element={customer}
                      />
                    </Box>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Loader />
      )}
      {customers.length === 0 && (
        <Text
          fontSize="xl"
          color="#000"
          position="relative"
          display="flex"
          h="100%"
          w="100%"
          justifyContent="center"
          alignItems="center"
          mt="-5rem"
          zIndex="-10"
        >
          El sistema aún no cuenta con clientes registrados.
        </Text>
      )}
         {filteredCustomers.length === 0 && customers.length !== 0 && (
        <Text
          fontSize="xl"
          color="#000"
          position="relative"
          display="flex"
          w="100%"
          h='100%'
          justifyContent="center"
          alignItems="center"
          mt="-5rem"
        >
          No se encontraron clientes que coincidan con tu búsqueda.
        </Text>
      )}
    </>
  );
};

export default CustomersPage;
