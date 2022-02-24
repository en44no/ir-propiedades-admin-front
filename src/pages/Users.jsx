import React, { useContext, useEffect } from "react";
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
  Text,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUserSwitch, AiOutlineUserDelete } from "react-icons/ai";
import CreateUser from "../components/Users/CreateUser";
import UsersContext from "../context/Users/UsersContext";

const UsersPage = () => {
  const { users } = useContext(UsersContext);

  useEffect(() => {
    console.log(users);
  });

  return (
    <>
      <Box display="flex" justifyContent="end" mr="2.2rem">
        <CreateUser />
      </Box>

      <Table variant="unstyled" size="sm">
        <Thead>
          <Tr maxWidth="100%">
            <Th fontSize="14px" textAlign="center" maxWidth="50px">
              Nombre
            </Th>
            <Th fontSize="14px" textAlign="center" maxWidth="50px">
              Nombre de Usuario
            </Th>
            <Th fontSize="14px" textAlign="center" maxWidth="50px">
              Roles
            </Th>
            <Th fontSize="14px" textAlign="center" maxWidth="50px">
              Opciones
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user._id}>
              <Td textAlign="center" isTruncated maxWidth="50px">
                {user.name}
              </Td>
              <Td textAlign="center" isTruncated maxWidth="80px">
                {user.username}
              </Td>
              <Td textAlign="center" maxWidth="50px">
                {user.roles.length > 0 ? (
                  user.roles.map((role) => {
                    return (
                      <Badge
                        fontSize="0.7rem"
                        fontWeight="bold"
                        color="white"
                        bgColor="defaultColor.400"
                        boxShadow="base"
                        borderRadius="15px"
                        px={2}
                        py={1}
                        mt={2}
                        mr={2}
                      >
                        {role.name}
                      </Badge>
                    );
                  })
                ) : (
                  <Text>Sin roles</Text>
                )}
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
                      <h1>Cambiar rol</h1>
                    </MenuItem>
                    <MenuItem
                      icon={<AiOutlineUserDelete fontSize="1.3rem" />}
                      _hover={{ borderRadius: "9px" }}
                      _focus={{ bgColor: "transparent" }}
                    >
                      <h1>Borrar usuario</h1>
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

export default UsersPage;
