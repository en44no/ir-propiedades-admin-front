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
  HStack,
  Divider,
  Badge,
} from "@chakra-ui/react";
import CopyInternalCode from "../CopyInternalCode";
import FullscreenImageModal from "../../Other/FullscreenImageModal";
import { MdOutline360 } from "react-icons/md";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import Loader from "../../Other/Loader/Loader";
import ConfirmDelete from "../../Other/ConfirmDelete";
import PropertiesContext from "../../../context/Properties/PropertiesContext";
import CreateDocument from "./CreateDocument";

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

const DocumentList = (props) => {
  const { property, text, width, buttonWithoutIcon, drawerSize, columns } =
    props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteMedia } = useContext(PropertiesContext);

  const [state, dispatch] = useReducer(dragReducer, {
    images: property.media,
  });

  useEffect(() => {
    state.images = property.media;
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
    const images = state.images;
  };

  return (
    <div>
      <Button
        id="viewImages"
        w={width ? width : "7rem"}
        onClick={onOpen}
        fontSize="15px"
        leftIcon={buttonWithoutIcon ? null : <CgFileDocument fontSize="20px" />}
        mr={5}
        borderRadius="9px"
        variant="add-button-clear"
      >
        {text ? text : "Gestionar documentos"}
      </Button>
      <Drawer size="xl" isOpen={isOpen} placement="right" onClose={onClose}>
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
              Documentos de la propiedad{" "}
              <CopyInternalCode
                text="propiedad"
                internalCode={
                  property.internalCode ? property.internalCode : "CÓDIGO"
                }
              />
            </Text>
          </DrawerHeader>
          <DrawerBody zIndex="0" color="#fff">
            {property.features.length > 0 && (
              <Box position="relative">
                <Box
                  display="flex"
                  bg="defaultColor.500"
                  p="3"
                  borderRadius="7px"
                  alignItems="center"
                  mb="4"
                >
                  <HStack w="100%" spacing="13px" height="25px">
                    <>
                      <Box w="35%" px="1rem" py="0.5" textAlign="center">
                        <Text fontWeight="500">Nombre</Text>
                      </Box>
                      <Divider orientation="vertical" />
                      <Box w="50%" justifyContent="center" textAlign="center">
                        <Text fontWeight="500">Descripción</Text>
                      </Box>
                      <Divider orientation="vertical" />
                      <Box w="15%" justifyContent="center" textAlign="center">
                        <Text fontWeight="500">Archivos</Text>
                      </Box>
                    </>
                  </HStack>
                </Box>
              </Box>
            )}

            {property.features.length === 0 ? (
              <Text
                fontSize="xl"
                color="#EAE9ED"
                display="flex"
                h="100%"
                w="100%"
                justifyContent="center"
                alignItems="center"
              >
                Esta propiedad aún no cuenta con características.
              </Text>
            ) : (
              property.features.map((feature) => (
                <Box key={feature._id} position="relative">
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
                        <Box w="35%" justifyContent="center" textAlign="center">
                          {feature.title.length > 24 ? (
                            <Tooltip
                              hasArrow
                              label={feature.title}
                              bg="defaultColor.500"
                            >
                              <Box>
                                {feature.title.slice(0, 24).concat("...")}
                              </Box>
                            </Tooltip>
                          ) : (
                            <Box>{feature.title}</Box>
                          )}
                        </Box>
                        <Divider orientation="vertical" />
                        <Box w="50%" justifyContent="center" textAlign="center">
                          {feature.title.length > 24 ? (
                            <Tooltip
                              hasArrow
                              label={feature.title}
                              bg="defaultColor.500"
                            >
                              <Box>
                                {feature.title.slice(0, 24).concat("...")}
                              </Box>
                            </Tooltip>
                          ) : (
                            <Box>{feature.title}</Box>
                          )}
                        </Box>
                        <Divider orientation="vertical" />
                        <Box w="15%" justifyContent="center" textAlign="center">
                          {feature.description.length > 50 ? (
                            <Tooltip
                              hasArrow
                              label={feature.description}
                              bg="defaultColor.500"
                            >
                              <Box>
                                {feature.description.slice(0, 50).concat("...")}
                              </Box>
                            </Tooltip>
                          ) : (
                            <Box>{feature.description}</Box>
                          )}
                        </Box>
                      </>
                    </HStack>
                  </Box>
                  <HStack
                    position="absolute"
                    bottom="-5px"
                    w="100%"
                    zIndex="-1"
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
                      <Box pb="0rem" textAlign="center" fontWeight="500">
                        <ConfirmDelete
                          text="¿Estás seguro de que deseas eliminar esta característica?"
                          name="característica"
                          onlyText="yes"
                          // functionToExecute={deleteFeature}
                          element={feature}
                          anotherElement={property}
                        />
                      </Box>
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
                        {/* <EditFeature feature={feature} property={property} /> */}
                      </Box>
                    </Box>
                  </HStack>
                </Box>
              ))
            )}
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="cancel-action" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <CreateDocument
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
export default DocumentList;
