import React, { useContext, useEffect } from "react";
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
  Text,
  HStack,
  Divider,
} from "@chakra-ui/react";
import CreatePost from "./CreatePost";
import SocialList from "../../Social/SocialList";
import BadgePostState from "./BadgePostState";
import { HiOutlineClipboardList } from "react-icons/hi";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import CopyInternalCode from "../CopyInternalCode";
import ConfirmDelete from "../../Other/ConfirmDelete";
import EditPost from "./EditPost";

const PostList = (props) => {
  const { full, property } = props;
  const { getPostsByProperty, posts, deletePost } =
    useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const parsePostState = (post) => {
    if (post.status[0] === "Active") {
      return <BadgePostState bgColor="#00b894" text="Activa" />;
    } else if (post.status[0] === "Paused") {
      return <BadgePostState bgColor="#FFB835" text="Pausada" />;
    } else if (post.status[0] === "Pending") {
      return <BadgePostState bgColor="#0984e3" text="Pendiente" />;
    } else if (post.status[0] === "Finished") {
      return <BadgePostState bgColor="#d63031" text="Finalizada" />;
    }
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };

  const formatToUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    if (isOpen) {
      getPostsByProperty(property._id);
    }
  }, [isOpen]);

  return (
    <>
      <>
        <Button
          id="createPosts"
          w={full === "yes" ? "100%" : "7rem"}
          onClick={onOpen}
          fontSize="15px"
          leftIcon={<HiOutlineClipboardList fontSize="23px" />}
          mr={5}
          borderRadius="9px"
          variant="add-button-clear"
        >
          Gestionar publicaciones
        </Button>
        <Drawer size="xl" isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="defaultColor.400">
            <DrawerCloseButton color="#fff" mt="2" />
            <DrawerHeader color="#fff" borderBottomWidth="1px" mb="2">
              <Text display="flex">
                Publicaciones de la propiedad{" "}
                <CopyInternalCode
                  internalCode={
                    property.internalCode ? property.internalCode : "CÓDIGO"
                  }
                />
              </Text>
            </DrawerHeader>
            <DrawerBody zIndex="0" color="#fff">
              {posts.length === 0 ? (
                <Text
                  fontSize="xl"
                  color="#EAE9ED"
                  position="relative"
                  display="flex"
                  h="100%"
                  w="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  Esta propiedad aún no cuenta con publicaciones.
                </Text>
              ) : (
                posts.map((post) => (
                  <Box key={post._id}>
                    <Box position="relative">
                      <Box
                        display="flex"
                        bg="defaultColor.300"
                        p="3"
                        borderRadius="7px"
                        alignItems="center"
                        mb="8"
                      >
                        <HStack w="100%" spacing="13px" height="25px">
                          <>
                            <Box p="0" minW="10%" maxW="10%">
                              {parsePostState(post)}
                            </Box>
                            <Divider orientation="vertical" />
                            <HStack
                              spacing="3px"
                              minW="17%"
                              maxW="17%"
                              justifyContent="center"
                              textAlign="center"
                            >
                              {post.isForSale ? (
                                <>
                                  <Text>Venta</Text>
                                  <Text>-</Text>
                                  <Text>
                                    {formatToUSD
                                      .format(post.forSalePrice)
                                      .slice(0, 10)
                                      .concat(
                                        post.forSalePrice.length > 10
                                          ? "..."
                                          : ""
                                      )}
                                  </Text>
                                </>
                              ) : null}
                            </HStack>
                            <Divider orientation="vertical" />
                            <HStack
                              spacing="3px"
                              minW="17%"
                              maxW="17%"
                              justifyContent="center"
                              textAlign="center"
                            >
                              {post.isForRent ? (
                                <>
                                  <Text>Alquiler</Text>
                                  <Text>-</Text>
                                  <Text>
                                    {formatToUSD
                                      .format(post.forRentPrice)
                                      .slice(0, 10)}
                                    {post.forSalePrice.length > 10 ? "..." : ""}
                                  </Text>
                                </>
                              ) : null}
                            </HStack>
                            <Divider orientation="vertical" />
                            <Box
                              w="17%"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Text>Desde {formatDate(post.startDate)}</Text>
                            </Box>
                            <Divider orientation="vertical" />
                            <Box
                              w="17%"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Text>Hasta {formatDate(post.endDate)}</Text>
                            </Box>
                            <Divider orientation="vertical" />
                            <HStack minW="8%" maxW="8%" justifyContent="center">
                              <SocialList onlyIcons="true" />
                            </HStack>
                          </>
                        </HStack>
                      </Box>
                      <HStack
                        position="absolute"
                        bottom="-5px"
                        zIndex="-1"
                        w="100%"
                        borderRadius="5px"
                      >
                        <Box
                          cursor="pointer"
                          position="relative"
                          _hover={{ top: "20px" }}
                          bg="#cc5e5d"
                          w="50%"
                          borderRadius="5px"
                        >
                          <Text pb="0rem" textAlign="center" fontWeight="500">
                            <ConfirmDelete
                              text="¿Estás seguro de que deseas eliminar esta publicación?"
                              name="publicación"
                              onlyText="yes"
                              functionToExecute={deletePost}
                              element={post}
                              anotherElement={property}
                            />
                          </Text>
                        </Box>
                        <Box
                          cursor="pointer"
                          position="relative"
                          _hover={{ top: "20px" }}
                          bg="#F0B955"
                          w="50%"
                          borderRadius="5px"
                        >
                          <Text pb="0rem" textAlign="center" fontWeight="500">
                            <EditPost property={property} post={post} />
                          </Text>
                        </Box>
                      </HStack>
                    </Box>
                  </Box>
                ))
              )}
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="cancel-action" mr={3} onClick={onClose}>
                Cerrar
              </Button>
              <CreatePost
                property={property}
                normalAddButton="yes"
                noRightMargin
              />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default PostList;
