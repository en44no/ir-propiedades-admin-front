import { useContext, useEffect, useReducer } from "react";
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
  Link,
} from "@chakra-ui/react";
import CopyInternalCode from "../CopyInternalCode";
import { HiOutlineExternalLink } from "react-icons/hi";
import { CgFileDocument } from "react-icons/cg";
import ConfirmDelete from "../../Other/ConfirmDelete";
import CreateDocument from "./CreateDocument";
import EditDocument from "./EditDocument";
import PropertiesContext from "../../../context/Properties/PropertiesContext";

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "MOVE": {
      draft[action.from] = draft[action.from] || [];
      draft[action.to] = draft[action.to] || [];
      const [removed] = draft[action.from].splice(action.fromIndex, 1);
      draft[action.to].splice(action.toIndex, 0, removed);
      break;
    }
    default:
      return;
  }
});

const DocumentList = (props) => {
  const { property, text, width, buttonWithoutIcon, drawerSize, columns } =
    props;
  const { deleteDocument } = useContext(PropertiesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            {property.documents && property.documents.length > 0 && (
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
                      <Box w="55%" justifyContent="center" textAlign="center">
                        <Text fontWeight="500">Descripción</Text>
                      </Box>
                      <Divider orientation="vertical" />
                      <Box w="10%" justifyContent="center" textAlign="center">
                        <Text fontWeight="500">Archivo</Text>
                      </Box>
                    </>
                  </HStack>
                </Box>
              </Box>
            )}

            {property.documents && property.documents.length === 0 ? (
              <Text
                fontSize="xl"
                color="#EAE9ED"
                display="flex"
                h="100%"
                w="100%"
                justifyContent="center"
                alignItems="center"
              >
                Esta propiedad aún no cuenta con documentos.
              </Text>
            ) : (
              property.documents.map((document) => (
                <Box key={document._id} position="relative">
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
                          {document.name.length > 24 ? (
                            <Tooltip
                              hasArrow
                              label={document.name}
                              bg="defaultColor.500"
                            >
                              <Box>
                                {document.name.slice(0, 24).concat("...")}
                              </Box>
                            </Tooltip>
                          ) : (
                            <Box>{document.name}</Box>
                          )}
                        </Box>
                        <Divider orientation="vertical" />
                        <Box w="55%" justifyContent="center" textAlign="center">
                          {document.description.length > 24 ? (
                            <Tooltip
                              hasArrow
                              label={document.description}
                              bg="defaultColor.500"
                            >
                              <Box>
                                {document.description
                                  .slice(0, 24)
                                  .concat("...")}
                              </Box>
                            </Tooltip>
                          ) : (
                            <Box>{document.description}</Box>
                          )}
                        </Box>
                        <Divider orientation="vertical" />
                        <Box
                          w="10%"
                          display="flex"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Tooltip
                            hasArrow
                            label="Abrir archivo en otra pestaña"
                            bg="defaultColor.500"
                          >
                            <Link
                              zIndex="0"
                              href={`http://168.181.187.43:4000/${document.url}`}
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
                              <HiOutlineExternalLink fontSize="1.4rem" />
                            </Link>
                          </Tooltip>
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
                          text="¿Estás seguro de que deseas eliminar este documento?"
                          name="documento"
                          onlyText="yes"
                          functionToExecute={deleteDocument}
                          element={document._id}
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
                        <EditDocument document={document} property={property} />
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
