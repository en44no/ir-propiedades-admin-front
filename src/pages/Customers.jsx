import React, { useContext } from "react";
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
  Badge,
} from "@chakra-ui/react";
import CreateCustomer from "../components/Customers/CreateCustomer";
import { FaUserEdit, FaUserMinus } from "react-icons/fa";
import CustomersContext from "../context/Customers/CustomersContext";
import Loader from "../components/Other/Loader/Loader";
import EditCustomer from "../components/Customers/EditCustomer";
import ConfirmDelete from "../components/Other/ConfirmDelete";

const CustomersPage = () => {
  const { customers, deleteCustomer } = useContext(CustomersContext);

  return (
    <>
      <Box display="flex" justifyContent="end" mr="2.2rem">
        <CreateCustomer />
      </Box>
      {customers ? (
        <Table variant="unstyled" size="sm">
          {customers.length > 0 && (
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
                  Tipo
                </Th>
                <Th fontSize="14px" textAlign="center" maxWidth="50px">
                  Opciones
                </Th>
              </Tr>
            </Thead>
          )}

          <Tbody>
            {customers.map((customer) => (
              <Tr>
                <Td textAlign="center" maxWidth="70px">
                  {customer.name}
                </Td>
                <Td textAlign="center" maxWidth="80px">
                  {customer.email}
                </Td>
                <Td textAlign="center" maxWidth="50px">
                  {customer.phone}
                </Td>
                <Td textAlign="center" maxWidth="50px">
                  <Badge
                    fontSize="0.7rem"
                    fontWeight="bold"
                    color="white"
                    bgColor="defaultColor.400"
                    boxShadow="base"
                    borderRadius="15px"
                    px={2}
                    py={1}
                  >
                    {customer.type}
                  </Badge>
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
    </>
  );
};

export default CustomersPage;
