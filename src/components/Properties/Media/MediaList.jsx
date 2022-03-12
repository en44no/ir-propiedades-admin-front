import { useCallback, useContext, useEffect, useReducer } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import produce from "immer";
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
  Text,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import CopyInternalCode from "../CopyInternalCode";
import FullscreenImageModal from "../../Other/FullscreenImageModal";
import { MdOutline360 } from "react-icons/md";
import { BsImages, BsFillInfoCircleFill } from "react-icons/bs";
import Loader from "../../Other/Loader/Loader";
import ConfirmDelete from "../../Other/ConfirmDelete";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import CreateMedia from "./CreateMedia";
import Notification from "../../Other/Notification";

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "MOVE": {
      draft[action.from] = draft[action.from] || [];
      draft[action.to] = draft[action.to] || [];
      const [removed] = draft[action.from].splice(action.fromIndex, 1);
      draft[action.to].splice(action.toIndex, 0, removed);
    }
  }
});

const MediaList = (props) => {
  const { property, text, width, buttonWithoutIcon, drawerSize, columns } =
    props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteMedia, changeOrderMediaFromProperty } =
    useContext(PropertiesContext);

  const [state, dispatch] = useReducer(dragReducer, {
    images: property.media,
  });

  const onDragEnd = useCallback((result) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        return;
      }
      dispatch({
        type: "MOVE",
        from: result.source.droppableId,
        to: result.destination.droppableId,
        fromIndex: result.source.index,
        toIndex: result.destination.index,
      });
    }
  }, []);

  const sendImages = () => {
    const images = state.images;
  };

  const confirmOrder = () => {
    if (property.media != state.images) {
      const images = state.images;
      changeOrderMediaFromProperty(images, property._id);
      onClose();
    } else {
      Notification(
        "Las imágenes no cambiaron",
        "No se han realizado cambios en el orden de las imágenes",
        "warning"
      );
    }
  };

  return (
    <div>
      <Button
        id="viewImages"
        w={width ? width : "7rem"}
        onClick={onOpen}
        fontSize="15px"
        leftIcon={buttonWithoutIcon ? null : <BsImages fontSize="20px" />}
        mr={5}
        borderRadius="9px"
        variant="add-button-clear"
      >
        {text ? text : "Gestionar imágenes"}
      </Button>
      <Drawer size="full" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="defaultColor.400">
          <DrawerCloseButton
            _focus={{ boxShadow: "none" }}
            color="#fff"
            mt="2"
          />
          <DrawerHeader color="#fff" borderBottomWidth="1px" mb="2">
            <Text display="flex">
              Imágenes de la propiedad{" "}
              <CopyInternalCode
                text="propiedad"
                internalCode={
                  property.internalCode ? property.internalCode : "CÓDIGO"
                }
              />
            </Text>
          </DrawerHeader>
          <DrawerBody color="#fff" overflow="hidden">
            {property.media ? (
              <DragDropContext onDragEnd={onDragEnd}>
                {property.media.length > 0 && (
                  <Box display="flex">
                    <Box
                      borderRadius="7px"
                      display="flex"
                      flexDirection="column"
                      w="100%"
                      ml="0.5rem"
                      p="0.5rem 2rem 2rem 2rem"
                      position="relative"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Droppable droppableId="images" type="IMAGES">
                        {(provided, snapshot) => {
                          return (
                            <Box
                              display="flex"
                              p="3"
                              flexDirection="column"
                              alignItems="center"
                              overflowY="auto"
                              h="73vh"
                              w="40%"
                              borderRadius="7px"
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {state.images?.map((image, index) => {
                                return (
                                  <Draggable
                                    key={image._id}
                                    draggableId={image._id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <Box
                                          position="relative"
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          {index + 1 == 1 && (
                                            <Tooltip
                                              label="Esta imagen es la portada"
                                              placement="left"
                                              bg="defaultColor.500"
                                              py="1.5"
                                            >
                                              <Box
                                                cursor="pointer"
                                                position="absolute"
                                                top="0.8rem"
                                                left="-2rem"
                                              >
                                                <BsFillInfoCircleFill />
                                              </Box>
                                            </Tooltip>
                                          )}
                                          <Box
                                            display="flex"
                                            h="110px"
                                            mb="0.9rem"
                                            outline="2px solid #cacaca"
                                            borderRadius="7px"
                                            _hover={{
                                              transition: "transform .2s",
                                              transform: "scale(0.98)",
                                            }}
                                          >
                                            <Box
                                              minW="200px"
                                              maxW="200px"
                                              h="110px"
                                              borderStartStartRadius="7px"
                                              borderEndStartRadius="7px"
                                              overflow="hidden"
                                              mb="0.8rem"
                                              position="relative"
                                            >
                                              <Box
                                                bg="defaultColor.400"
                                                borderRadius="50%"
                                                position="absolute"
                                                p="0"
                                                h="1.7rem"
                                                w="1.7rem"
                                                top="2"
                                                left="2"
                                                cursor="pointer"
                                                _hover={{
                                                  bg: "defaultColor.500",
                                                }}
                                              >
                                                <Box
                                                  textAlign="center"
                                                  mt="1px"
                                                >
                                                  <Text fontWeight="500">
                                                    {index + 1}
                                                  </Text>
                                                </Box>
                                              </Box>
                                              <FullscreenImageModal
                                                minWidth="200px"
                                                maxWidth="200px"
                                                src={image.url}
                                                alt={image.description}
                                                hover="yes"
                                                text={`Imagen de la propiedad ${property.internalCode}`}
                                                description={image.description}
                                              />
                                            </Box>
                                            <Box
                                              bg="defaultColor.400"
                                              borderRadius="50%"
                                              position="absolute"
                                              p="0"
                                              minW="1.7rem"
                                              minH="1.7rem"
                                              h="1.7rem"
                                              w="1.7rem"
                                              top="2.5"
                                              right="2.5"
                                              cursor="pointer"
                                              _hover={{
                                                bg: "defaultColor.500",
                                              }}
                                            >
                                              <ConfirmDelete
                                                text="¿Estás seguro de que deseas eliminar esta imagen?"
                                                name={`imagen "${image.description}"`}
                                                functionToExecute={deleteMedia}
                                                element={property}
                                                anotherElement={image}
                                                onlyIcon="true"
                                              />
                                            </Box>
                                            <Box
                                              bg="defaultColor.700"
                                              borderStartEndRadius="7px"
                                              borderEndEndRadius="7px"
                                              justifyContent="center"
                                              alignItems="center"
                                              textAlign="center"
                                              w="17rem"
                                              h="100%"
                                            >
                                              <Box
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                                textAlign="center"
                                                fontWeight="500"
                                                mt="0.5rem"
                                                fontSize="0.95rem"
                                              >
                                                Imagen{" "}
                                                {image.type == "360"
                                                  ? "360"
                                                  : "normal"}
                                                {image.type == "360" && (
                                                  <Box ml="0.3rem">
                                                    <MdOutline360 fontSize="1.2rem" />
                                                  </Box>
                                                )}
                                              </Box>
                                              {image.description.length > 90 ? (
                                                <Tooltip
                                                  hasArrow
                                                  label={image.description}
                                                  bg="defaultColor.500"
                                                >
                                                  <Box
                                                    fontSize="0.9rem"
                                                    p="2"
                                                    mt="-0.5rem"
                                                  >
                                                    {image.description
                                                      .slice(0, 90)
                                                      .concat("...")}
                                                  </Box>
                                                </Tooltip>
                                              ) : (
                                                <Box
                                                  fontSize="0.9rem"
                                                  p="2"
                                                  mt="-0.5rem"
                                                >
                                                  {image.description}
                                                </Box>
                                              )}
                                            </Box>
                                          </Box>
                                        </Box>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </Box>
                          );
                        }}
                      </Droppable>
                    </Box>
                  </Box>
                )}
              </DragDropContext>
            ) : (
              <Loader />
            )}
          </DrawerBody>
          {property.media.length === 0 && (
            <Text
              fontSize="xl"
              color="#fff"
              position="relative"
              display="flex"
              h="100%"
              w="100%"
              justifyContent="center"
              alignItems="center"
              mt="-2rem"
            >
              Esta propiedad aún no cuenta con imágenes.
            </Text>
          )}
          <DrawerFooter borderTopWidth="1px">
            <Button variant="cancel-action" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button
              id="createPosts"
              w="9rem"
              onClick={() => confirmOrder()}
              borderRadius="9px"
              variant="add-button-clear"
              mr={3}
            >
              Confirmar orden
            </Button>
            <CreateMedia
              property={property}
              normalAddButton="yes"
              noRightMargin
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default MediaList;
