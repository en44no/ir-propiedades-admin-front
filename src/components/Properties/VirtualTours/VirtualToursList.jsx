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
import {
  BsFileImage,
  BsArrowRightCircleFill,
  BsArrowLeftCircleFill,
} from "react-icons/bs";
import CopyInternalCode from "../CopyInternalCode";
import FullscreenImageModal from "../../Other/FullscreenImageModal";
import { MdOutline360 } from "react-icons/md";
import MediaList from "../Media/MediaList";
import Loader from "../../Other/Loader/Loader";
import PropertiesContext from "../../../context/Properties/PropertiesContext";

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "SELECTED_IMAGES": {
      draft.selectedImages = action.payload;
      break;
    }
    case "AVAILABLE_IMAGES": {
      draft.availableImages = action.payload;
      break;
    }
    case "MOVE": {
      draft[action.from] = draft[action.from] || [];
      draft[action.to] = draft[action.to] || [];
      const [removed] = draft[action.from].splice(action.fromIndex, 1);
      draft[action.to].splice(action.toIndex, 0, removed);
    }
  }
});

const VirtualToursList = (props) => {
  const { property } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addVirtualTourToProperty } = useContext(PropertiesContext);

  const [state, dispatch] = useReducer(dragReducer, {
    selectedImages: property.virtualTour ? property.virtualTour : [],
    availableImages: property.media.filter(
      ({ _id: id1 }) =>
        !property.virtualTour.some(({ _id: id2 }) => id2 === id1)
    ),
  });

  useEffect(() => {
    dispatch({
      type: "SELECTED_IMAGES",
      payload: property.virtualTour,
    });

    dispatch({ type: "AVAILABLE_IMAGES", payload: property.media.filter(
      ({ _id: id1 }) =>
        !property.virtualTour.some(({ _id: id2 }) => id2 === id1)
    ), });
  }, [property.media]);

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
    const virtualTour = state.selectedImages;
    addVirtualTourToProperty(virtualTour, property);
    onClose();
  };

  const selectAllImages = () => {
    dispatch({
      type: "SELECTED_IMAGES",
      payload: state.availableImages,
    });
    dispatch({
      type: "AVAILABLE_IMAGES",
      payload: [],
    });
  };

  const deselectAllImages = () => {
        dispatch({
          type: "AVAILABLE_IMAGES",
          payload: state.selectedImages,
        });
        dispatch({
          type: "SELECTED_IMAGES",
          payload: [],
        });
  };

  return (
    <div>
      <Button
        id="viewImages"
        w="100%"
        onClick={onOpen}
        fontSize="15px"
        leftIcon={<BsFileImage fontSize="20px" />}
        mr={5}
        borderRadius="9px"
        variant="add-button-clear"
      >
        Gestionar tour virtual
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
              Tour virtual de la propiedad{" "}
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
                      bg="defaultColor.500"
                      position="relative"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        position="relative"
                        fontSize="1.3rem"
                        fontWeight="500"
                      >
                        Imágenes disponibles
                        <Tooltip
                          hasArrow
                          label="Seleccionar todas"
                          bg="defaultColor.500"
                          placement="top"
                        >
                          <Box
                            onClick={() => selectAllImages()}
                            cursor="pointer"
                            position="absolute"
                            top="0.4rem"
                            right="-2.5rem"
                          >
                            <BsArrowRightCircleFill fontSize="1.4rem" />
                          </Box>
                        </Tooltip>
                      </Box>
                      <Droppable droppableId="availableImages" type="IMAGES">
                        {(provided, snapshot) => {
                          return (
                            <Box
                              display="flex"
                              p="3"
                              flexDirection="column"
                              alignItems="center"
                              overflowY="auto"
                              h="72vh"
                              w="75%"
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {state.availableImages?.map((image, index) => {
                                return (
                                  <Draggable
                                    key={image._id}
                                    draggableId={image._id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <Box
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
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
                    <Box
                      borderRadius="7px"
                      display="flex"
                      flexDirection="column"
                      w="100%"
                      ml="0.5rem"
                      p="1rem 2rem 2rem 2rem"
                      bg="defaultColor.500"
                      position="relative"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        position="relative"
                        fontSize="1.3rem"
                        fontWeight="500"
                      >
                        Imágenes seleccionadas
                        <Tooltip
                          hasArrow
                          label="Deseleccionar todas"
                          bg="defaultColor.500"
                          placement="top"
                        >
                          <Box
                            onClick={() => deselectAllImages()}
                            cursor="pointer"
                            position="absolute"
                            top="0.4rem"
                            left="-2.5rem"
                          >
                            <BsArrowLeftCircleFill fontSize="1.4rem" />
                          </Box>
                        </Tooltip>
                      </Box>
                      <Droppable droppableId="selectedImages" type="IMAGES">
                        {(provided, snapshot) => {
                          return (
                            <Box
                              display="flex"
                              p="3"
                              flexDirection="column"
                              alignItems="center"
                              overflowY="auto"
                              h="72vh"
                              w="75%"
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {state.selectedImages?.map((image, index) => {
                                return (
                                  <Draggable
                                    key={image._id}
                                    draggableId={image._id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <Box
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
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
              Esta propiedad aún no cuenta con imágenes, por lo tanto no puedes
              crear un tour virtual.
            </Text>
          )}
          <DrawerFooter borderTopWidth="1px">
            <MediaList
              property={property}
              text="Gestionar imágenes de la propiedad"
              width="17rem"
              buttonWithoutIcon="yes"
              drawerSize="full"
              columns="5"
            />
            <Button variant="cancel-action" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button
              id="createPosts"
              w="7rem"
              onClick={() => sendImages()}
              borderRadius="9px"
              variant="add-button-dark"
            >
              Confirmar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default VirtualToursList;
