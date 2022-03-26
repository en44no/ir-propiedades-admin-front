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
  Tooltip,
  Link,
} from "@chakra-ui/react";
import CreatePost from "./CreatePost";
import SocialList from "../../Social/SocialList";
import BadgePostState from "./BadgePostState";
import { HiOutlineClipboardList, HiOutlineExternalLink } from "react-icons/hi";
import { MdOutlineStar } from "react-icons/md";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import CopyInternalCode from "../CopyInternalCode";
import ConfirmDelete from "../../Other/ConfirmDelete";
import EditPost from "./EditPost";
import PostImagesList from "./PostImagesList";

const PostList = (props) => {
  const { full, property } = props;
  const { getPostsByProperty, posts, deletePost, changePostIsFeature } =
    useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const parsePostState = (post) => {
    if (post.status[0] === "Activa") {
      return <BadgePostState bgColor="#00b894" text="Activa" />;
    } else if (post.status[0] === "Pausada") {
      return <BadgePostState bgColor="#FFB835" text="Pausada" />;
    } else if (post.status[0] === "Pendiente") {
      return <BadgePostState bgColor="#0984e3" text="Pendiente" />;
    } else if (post.status[0] === "Finalizada") {
      return <BadgePostState bgColor="#d63031" text="Finalizada" />;
    }
  };

  const handlePostIsFeatured = (post) => {
    if (post.isFeatured == true) {
      changePostIsFeature(post, false);
    } else {
      changePostIsFeature(post, true);
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
        <Drawer size="full" isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent
            borderLeft="1px white solid"
            borderStartStartRadius="7px"
            borderEndStartRadius="7px"
            bg="defaultColor.400"
          >
            <DrawerCloseButton
              _focus={{ boxShadow: "none" }}
              color="#fff"
              mt="2"
            />
            <DrawerHeader color="#fff" borderBottomWidth="1px" mb="2">
              <Text display="flex">
                Publicaciones de la propiedad{" "}
                <CopyInternalCode
                  text="propiedad"
                  internalCode={
                    property.internalCode ? property.internalCode : "CÓDIGO"
                  }
                />
              </Text>
            </DrawerHeader>
            <DrawerBody zIndex="0" color="#fff">
              {posts.length > 0 && (
                <Box position="relative">
                  <Box
                    display="flex"
                    bg="defaultColor.500"
                    p="3"
                    borderRadius="7px"
                    alignItems="center"
                    mb="5"
                  >
                    <HStack w="100%" spacing="13px" height="25px">
                      <>
                        <Box
                          p="0"
                          minW="10%"
                          maxW="10%"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text>Estado</Text>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box
                          p="0"
                          minW="15%"
                          maxW="15%"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text>Título</Text>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box
                          p="0"
                          minW="10%"
                          maxW="10%"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text>Venta</Text>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box
                          p="0"
                          minW="10%"
                          maxW="10%"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text>Alquiler</Text>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box
                          minW="10%"
                          maxW="10%"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text>Fecha desde</Text>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box
                          minW="10%"
                          maxW="10%"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text>Fecha hasta</Text>
                        </Box>
                        <Divider orientation="vertical" />
                        <HStack
                          w="10%"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text>Publicado en</Text>
                        </HStack>
                        <Divider orientation="vertical" />
                        <HStack
                          w="12%"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text>Opciones</Text>
                        </HStack>
                      </>
                    </HStack>
                  </Box>
                </Box>
              )}
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
                            <Box
                              minW="15%"
                              maxW="15%"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Box>
                                {post.title != null ? (
                                  post.title.length > 30 ? (
                                    <Tooltip
                                      hasArrow
                                      label={post.title}
                                      bg="defaultColor.500"
                                    >
                                      <Box>
                                        {post.title.slice(0, 30).concat("...")}
                                      </Box>
                                    </Tooltip>
                                  ) : (
                                    <Box ml="1">{post.title}</Box>
                                  )
                                ) : (
                                  <Text>-</Text>
                                )}
                              </Box>
                            </Box>
                            <Divider orientation="vertical" />
                            <HStack
                              p="0"
                              minW="10%"
                              maxW="10%"
                              justifyContent="center"
                              textAlign="center"
                            >
                              {post.isForSale != 0 ? (
                                <>
                                  <Box>
                                    {formatToUSD
                                      .format(post.forSalePrice)
                                      .slice(0, 10)
                                      .concat(
                                        post.forSalePrice.length > 10
                                          ? "..."
                                          : ""
                                      )}
                                  </Box>
                                </>
                              ) : (
                                <Text>-</Text>
                              )}
                            </HStack>
                            <Divider orientation="vertical" />
                            <HStack
                              p="0"
                              minW="10%"
                              maxW="10%"
                              justifyContent="center"
                              textAlign="center"
                            >
                              {post.isForRent != 0 ? (
                                <>
                                  <Text>
                                    {formatToUSD
                                      .format(post.forRentPrice)
                                      .slice(0, 10)}
                                    {post.forSalePrice.length > 10 ? "..." : ""}
                                  </Text>
                                </>
                              ) : (
                                <Text>-</Text>
                              )}
                            </HStack>
                            <Divider orientation="vertical" />
                            <Box
                              minW="10%"
                              maxW="10%"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Box>{formatDate(post.startDate)}</Box>
                            </Box>
                            <Divider orientation="vertical" />
                            <Box
                              minW="10%"
                              maxW="10%"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Box>{formatDate(post.endDate)}</Box>
                            </Box>
                            <Divider orientation="vertical" />
                            <HStack w="10%" justifyContent="center">
                              <SocialList onlyIcons="true" />
                            </HStack>
                            <Divider orientation="vertical" />
                            <HStack w="12%" justifyContent="center">
                              <PostImagesList images={post.media} post={post} />
                              <Tooltip
                                hasArrow
                                label={
                                  post.isFeatured == true
                                    ? "Quitar de destacados"
                                    : "Marcar como destacada"
                                }
                                bg="defaultColor.500"
                              >
                                <HStack
                                  cursor="pointer"
                                  px="3"
                                  py="1.5"
                                  bg="defaultColor.400"
                                  borderRadius="7px"
                                  alignItems="center"
                                  onClick={() => handlePostIsFeatured(post)}
                                >
                                  <Box
                                    fontSize="0.8rem"
                                    display="flex"
                                    fontWeight="500"
                                    alignItems="center"
                                    gap="0.2rem"
                                  >
                                    <MdOutlineStar
                                      color={
                                        post.isFeatured == true
                                          ? "#fdcb6e"
                                          : "#fff"
                                      }
                                      fontSize="20px"
                                    />
                                  </Box>
                                </HStack>
                              </Tooltip>
                              <HStack>
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  textAlign="center"
                                >
                                  <Tooltip
                                    hasArrow
                                    label="Ver en MercadoLibre"
                                    bg="defaultColor.500"
                                  >
                                    <Link
                                      zIndex="0"
                                      download
                                      target="_blank"
                                      rel="noreferrer"
                                      cursor="pointer"
                                      px="3"
                                      py="1.5"
                                      bg="defaultColor.400"
                                      borderRadius="7px"
                                      alignItems="center"
                                    >
                                      <HiOutlineExternalLink fontSize="1.25rem" />
                                    </Link>
                                  </Tooltip>
                                </Box>
                              </HStack>
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
                          <Box pb="0rem" textAlign="center" fontWeight="500">
                            <EditPost property={property} post={post} />
                          </Box>
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
