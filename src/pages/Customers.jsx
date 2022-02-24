import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUserSwitch, AiOutlineUserDelete } from "react-icons/ai";
import CreateCustomer from "../components/Customers/CreateCustomer";

const customers = [
  {
    name: "Nahuel Márquez",
    email: "nahuel.marquez@yahoo.net",
    phone: "099784575",
    description: "nashe",
  },
];

const CustomersPage = () => {
  return (
    <>
      <Box display="flex" justifyContent="end" mr="2.2rem">
        <CreateCustomer />
      </Box>

      <Table variant="unstyled" size="sm">
        <Thead>
          <Tr maxWidth="100%">
            <Th fontSize="14px" textAlign="center" maxWidth="50px">
              Nombre
            </Th>
            <Th fontSize="14px" textAlign="center" maxWidth="50px">
              email
            </Th>
            <Th fontSize="14px" textAlign="center" maxWidth="50px">
              Telefono
            </Th>
            <Th fontSize="14px" textAlign="center" maxWidth="50px">
              Descripcion
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {customers.map((customer) => (
            <Tr>
              <Td textAlign="center" isTruncated maxWidth="50px">
                {customer.name}
              </Td>
              <Td textAlign="center" isTruncated maxWidth="80px">
                {customer.email}
              </Td>
              <Td textAlign="center" isTruncated maxWidth="50px">
                {customer.phone}
              </Td>
              <Td textAlign="center" isTruncated maxWidth="50px">
                {customer.description}
              </Td>
              <Td textAlign="center" isTruncated maxWidth="50px">
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<IoSettingsOutline fontSize="1.3rem" />}
                    bg="transparent"
                  />
                  <MenuList bg="dark" p={2} boxShadow="base" border="none">
                    <MenuItem
                      icon={<AiOutlineUserSwitch fontSize="1.3rem" />}
                      _focus={{ bgColor: "transparent" }}
                    >
                      <h1>Editar</h1>
                    </MenuItem>
                    <MenuItem
                      icon={<AiOutlineUserDelete fontSize="1.3rem" />}
                      _hover={{ borderRadius: "9px" }}
                      _focus={{ bgColor: "transparent" }}
                    >
                      <h1>Borrar cliente</h1>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default CustomersPage;
