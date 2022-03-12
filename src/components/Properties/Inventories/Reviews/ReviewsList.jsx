import React, { useContext } from "react";
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
  HStack,
  Box,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { FaMobileAlt } from "react-icons/fa";
import { HiClipboardCheck } from "react-icons/hi";
import { GiPadlock } from "react-icons/gi";
import PropertiesContext from "../../../../context/Properties/PropertiesContext";
import CopyInternalCode from "../../CopyInternalCode";
import BadgeInventoryStatus from "../BadgeInventoryStatus";
import Notification from "../../../Other/Notification";
import ItemsCompareList from "../Items/ItemsCompareList";

const ReviewsList = (props) => {
  const { property, inventory } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { changeReviewStatus } = useContext(PropertiesContext);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };

  const parseReviewStatus = (review) => {
    if (review.status === "Abierto") {
      return <BadgeInventoryStatus bgColor="#00b894" text="Abierto" />;
    } else if (review.status === "Cerrado") {
      return <BadgeInventoryStatus bgColor="#d63031" text="Cerrado" />;
    }
  };

  const noItemsNotification = () => {
    Notification(
      "Este inventario no tiene controles",
      "Deberás agregarlos mediante la app de celular",
      "warning"
    );
  };

  return (
    <>
      <>
        <Tooltip hasArrow label="Ver controles" bg="defaultColor.500">
          <HStack
            cursor="pointer"
            px="3"
            py="1.5"
            bg="defaultColor.400"
            borderRadius="7px"
            alignItems="center"
            onClick={
              inventory.reviews.length == 0
                ? () => noItemsNotification()
                : onOpen
            }
          >
            <Box fontSize="0.8rem" fontWeight="500">
              {inventory.reviews.length}
            </Box>
            <HiClipboardCheck fontSize="1.2rem" />
          </HStack>
        </Tooltip>
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
                Controles del inventario{" "}
                <CopyInternalCode
                  text="inventario"
                  internalCode={inventory.internalCode}
                />
              </Text>
              <Tooltip
                hasArrow
                label="Ten en cuenta que esta sección se gestiona mayormente desde la app de celular"
                bg="defaultColor.500"
              >
                <Box
                  cursor="pointer"
                  position="absolute"
                  top="1.4rem"
                  right="3.5rem"
                  float="right"
                >
                  <FaMobileAlt />
                </Box>
              </Tooltip>
            </DrawerHeader>
            <DrawerBody zIndex="0" color="#fff">
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
                      w="10%"
                      justifyContent="center"
                      textAlign="center"
                    >
                      <Box fontWeight="500">Estado</Box>
                    </Box>
                    <Divider orientation="vertical" />
                    <Box w="10%" justifyContent="center" textAlign="center">
                      <Text fontWeight="500">Código Interno</Text>
                    </Box>
                    <Divider orientation="vertical" />
                    <Box w="55%" justifyContent="center" textAlign="center">
                      <Text fontWeight="500">Comentario</Text>
                    </Box>
                    <Divider orientation="vertical" />
                    <Box w="15%" justifyContent="center" textAlign="center">
                      <Text fontWeight="500">Fecha</Text>
                    </Box>
                    <Divider orientation="vertical" />
                    <Box w="10%" justifyContent="center" textAlign="center">
                      <Text fontWeight="500">Acciones</Text>
                    </Box>
                  </>
                </HStack>
              </Box>
              <Box position="relative">
                <HStack
                  position="absolute"
                  bottom="-5px"
                  w="100%"
                  zIndex="-1"
                  borderRadius="5px"
                ></HStack>
              </Box>
              {inventory.reviews.map((review) => (
                <Box key={review._id} position="relative">
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
                        <Box p="0" w="10%">
                          {parseReviewStatus(review)}
                        </Box>
                        <Divider orientation="vertical" />
                        <Box w="10%" justifyContent="center" textAlign="center">
                          <Box>
                            <CopyInternalCode
                              text="control"
                              internalCode={review.internalCode}
                            />
                          </Box>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box w="55%" justifyContent="center" textAlign="center">
                          {review.comments.length > 40 ? (
                            <Tooltip
                              hasArrow
                              label={review.comments}
                              bg="defaultColor.500"
                            >
                              <Box>
                                {review.comments.slice(0, 40).concat("...")}
                              </Box>
                            </Tooltip>
                          ) : (
                            <Box>{review.comments}</Box>
                          )}
                        </Box>
                        <Divider orientation="vertical" />
                        <Box w="15%" justifyContent="center" textAlign="center">
                          <Box>{formatDate(review.date)}</Box>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box
                          w="10%"
                          gap="10px"
                          display="flex"
                          justifyContent="center"
                        >
                          <ItemsCompareList
                            typeSingular="control"
                            typePlural="controles"
                            property={property}
                            typeObject={review}
                            typeObjectToCompare={inventory}
                            itemsQuantity={review.items.length}
                          />
                          {review.status === "Abierto" && (
                            <Tooltip
                              hasArrow
                              label="Cerrar control"
                              bg="defaultColor.500"
                            >
                              <HStack
                                cursor="pointer"
                                px="3"
                                py="1.5"
                                bg="defaultColor.400"
                                borderRadius="7px"
                                alignItems="center"
                                onClick={() => {
                                  changeReviewStatus("Cerrado", review._id);
                                }}
                              >
                                <GiPadlock fontSize="1.2rem" />
                              </HStack>
                            </Tooltip>
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
                  ></HStack>
                </Box>
              ))}
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="cancel-action" mr={2} onClick={onClose}>
                Cerrar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default ReviewsList;
