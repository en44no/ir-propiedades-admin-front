import React from "react";
import {
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Box,
  Badge,
  Text,
  HStack,
  Divider,
  Image,
} from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import { FaFacebookF } from "react-icons/fa";
import CreatePost from "./CreatePost";

const PostList = (props) => {
  const { full, property, propertyPosts } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(propertyPosts);

  const parsePostState = (post) => {
    if (post.status[0] === "Active") {
      return "Activo";
    } else if (post.status[0] === "Paused") {
      return "Pausado";
    } else if (post.status[0] === "Pending") {
      return "Pendiente";
    } else if (post.status[0] === "Finished") {
      return "Finalizado";
    }
  };

  return (
    <>
      <>
        <Button
          id="createPosts"
          w={full === "yes" ? "100%" : "8rem"}
          onClick={onOpen}
          fontSize="15px"
          leftIcon={HiPlus}
          mr={5}
          borderRadius="9px"
          variant="add-button-clear"
        >
          Ver publicaciones
        </Button>
        <Drawer size="xl" isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="defaultColor.400">
            <DrawerCloseButton color="#fff" mt="2" />
            <DrawerHeader color="#fff" borderBottomWidth="1px" mb="2">
              Ver publicaciones de la propiedad "{property.name}"
            </DrawerHeader>
            <DrawerBody color="#fff">
              <Box display="flex" justifyContent="end" mr="-5" mb="4">
                <CreatePost property={property} normalAddButton="yes" />
              </Box>
              {propertyPosts.map((post) => (
                <Box
                  display="flex"
                  bg="defaultColor.300"
                  p="3"
                  borderRadius="7px"
                  alignItems="center"
                  mb="5"
                >
                  <HStack w="100%" spacing="13px" height="25px">
                    <>
                      <Box minW="11%" maxW="11%">
                        <Badge
                          minW="100%"
                          maxW="100%"
                          borderRadius="7px"
                          px="2"
                          py="0.5"
                          bg="defaultColor.400"
                          color="#fff"
                        >
                          <Text textAlign="center">{parsePostState(post)}</Text>
                        </Badge>
                      </Box>
                      <Divider orientation="vertical" />
                      <HStack spacing="3px" minW="14%" maxW="14%">
                        {post.isForSale ? (
                          <>
                            <Text>Venta</Text>
                            <Text>-</Text>
                            <Text>$400000</Text>
                          </>
                        ) : null}
                      </HStack>
                      <Divider orientation="vertical" />
                      <HStack spacing="3px" minW="14%" maxW="14%">
                        {post.isForRent ? (
                          <>
                            <Text>Alquiler</Text>
                            <Text>-</Text>
                            <Text>$2000</Text>
                          </>
                        ) : null}
                      </HStack>
                      <Divider orientation="vertical" />
                      <Box w="17%">
                        <Text>Desde 09/12/2021</Text>
                      </Box>
                      <Divider orientation="vertical" />
                      <Box w="17%">
                        <Text>Hasta 09/12/2021</Text>
                      </Box>
                      <Divider orientation="vertical" />
                      <HStack minW="11%" maxW="11%">
                        <FaFacebookF />
                        <Image
                          h="17px"
                          src="https://i.postimg.cc/vBbmvVhf/Capture-removebg-preview.png"
                          alt="MercadoLibre"
                        />
                      </HStack>
                    </>
                  </HStack>
                </Box>
              ))}
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="cancel-action" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button variant="confirm-add-button">Confirmar</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default PostList;
