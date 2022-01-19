import React from 'react';
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
} from '@chakra-ui/react';
import { IoSettingsOutline } from 'react-icons/io5';
import { AiOutlineUserSwitch, AiOutlineUserDelete } from 'react-icons/ai';
import CreateUser from '../components/Users/CreateUser';

const users = [
	{
		name: 'Nahuel Márquez',
    userName: 'nahuel.marquez',
		role: 'Administrador',
	},
];

const User = () => {

	return (
		<>
      
			<Box display="flex" justifyContent="end" mr="2.2rem">
        <CreateUser />
			</Box>
      
			<Table variant="unstyled" size="sm">
				<Thead>
					<Tr maxWidth="100%">
						<Th fontSize="14px" textAlign="center" maxWidth="50px">Nombre</Th>
						<Th fontSize="14px" textAlign="center" maxWidth="50px">Nombre de Usuario</Th>
						<Th fontSize="14px" textAlign="center" maxWidth="50px">Rol</Th>
						<Th fontSize="14px" textAlign="center" maxWidth="50px">opciones</Th>
					</Tr>
				</Thead>
				<Tbody>
					{users.map((user) => (
						<Tr>
							<Td textAlign="center" isTruncated maxWidth="50px">{user.name}</Td>
							<Td textAlign="center" isTruncated maxWidth="80px">{user.userName}</Td>
							<Td textAlign="center" isTruncated maxWidth="50px">{user.role}</Td>
							<Td textAlign="center" isTruncated maxWidth="50px">
								<Menu>
									<MenuButton
										as={IconButton}
										aria-label="Options"
										icon={<IoSettingsOutline fontSize="1.5rem" />}
										bg="transparent"
									/>
									<MenuList bg="dark" p={2} boxShadow="base" border="none">
										<MenuItem icon={<AiOutlineUserSwitch fontSize="1.3rem" />} _focus={{ bgColor: 'transparent' }}>
											<h1>Cambiar rol</h1>
										</MenuItem>
										<MenuItem icon={<AiOutlineUserDelete fontSize="1.3rem" />} _hover={{ borderRadius: '9px'}} _focus={{ bgColor: 'transparent' }}>
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

export default User;
