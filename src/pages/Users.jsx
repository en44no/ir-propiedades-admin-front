import React, { useContext, useEffect, useState } from "react";
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
import ConfirmDelete from "../components/Other/ConfirmDelete";
import RolesInfoModal from "../components/Users/Roles/RolesInfoModal";
import Search from "../components/Other/Search";
import Loader from "../components/Other/Loader/Loader";

const UsersPage = () => {
  const { users, deleteUser, usersAreLoading } = useContext(UsersContext);
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <>
      <Box ml="1rem" display="flex" justifyContent="end">
        <Search
          placeHolder="Busca usuarios según nombre, email y nombre de usuario..."
          listToFilter={users}
          filters={["name", "email", "username"]}
          listSetter={setFilteredUsers}
        />
        <CreateUser />
      </Box>
      {usersAreLoading == true ? (
        <Box
          h="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Loader />
        </Box>
      ) : (
        <>
          {filteredUsers.length > 0 && (
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
                    Email
                  </Th>
                  {/* <Th fontSize="14px" textAlign="center" maxWidth="60px">
                    <Box display="flex" gap="10px" justifyContent="center">
                      Roles
                      <RolesInfoModal />
                    </Box>
                  </Th> */}
                  <Th fontSize="14px" textAlign="center" maxWidth="50px">
                    Acciones
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredUsers.map((user) => (
                  <Tr key={user._id}>
                    <Td textAlign="center" maxWidth="50px">
                      {user.name}
                    </Td>
                    <Td textAlign="center" maxWidth="80px">
                      {user.username}
                    </Td>
                    <Td textAlign="center" maxWidth="80px">
                      {user.email}
                    </Td>
                    {/* <Td textAlign="center" maxWidth="60px">
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
                    </Td> */}
                    <Td textAlign="center" maxWidth="50px">
                      <HStack justifyContent="center">
                        <EditUser user={user} />
                        <ConfirmDelete
                          text="¿Estás seguro de que deseas eliminar este usuario?"
                          name="usuario"
                          onlyIcon="yes"
                          icon="userIcon"
                          functionToExecute={deleteUser}
                          element={user._id}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}

          {users.length === 0 && (
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
              El sistema aún no cuenta con usuarios registrados.
            </Text>
          )}

          {filteredUsers.length === 0 && users.length !== 0 && (
            <Text
              fontSize="xl"
              color="#000"
              position="relative"
              display="flex"
              w="100%"
              h="100%"
              justifyContent="center"
              alignItems="center"
              mt="-5rem"
            >
              No se encontraron usuarios que coincidan con tu búsqueda.
            </Text>
          )}
        </>
      )}
    </>
  );
};

export default UsersPage;
