import React from 'react';
import {
	Box,
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';
import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';
const Footer = () => {

	return (
		<>
			<Box alignSelf="flex-end">
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<IoSettingsOutline fontSize="1.5rem" />}
						bg="transparent"
					/>
					<MenuList bg="dark" boxShadow="base" border="none">
						<MenuItem borderRadius="9px" _hover={{ borderRadius: '9px'}}>
						</MenuItem>
					</MenuList>
				</Menu>
				<IconButton ml={1} bg="transparent">
					<IoLogOutOutline fontSize="1.7rem" />
				</IconButton>
			</Box>
		</>
	);
};

export default Footer;
