import React, { useContext } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Box,
  Text,
  Badge,
} from "@chakra-ui/react";
import CreateUser from "../components/Users/CreateUser";
import UsersContext from "../context/Users/UsersContext";
import EditUser from "../components/Users/EditUser";

const UsersPage = () => {
  const { users } = useContext(UsersContext);

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
                <HStack justifyContent="center">
                  <EditUser user={user} />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default UsersPage;
