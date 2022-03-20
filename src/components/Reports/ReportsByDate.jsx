import React from "react";
import {
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaCalendarCheck } from "react-icons/fa";

const ReportsByDate = (props) => {
  const {
    buttonText,
    modalTitle,
    atTheMoment,
    dataQuantity,
    todayQuantity,
    lastWeekQuantity,
    lastMonthQuantity,
    lastYearQuantity,
    percentageTodayYesterday,
    percentageLastWeekTwoWeekAgo,
    percentageLastMonthTwoMonthAgo,
    percentageLastYearTwoYearsAgo,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatDate = () => {
    const newDate = new Date();
    return newDate.toLocaleDateString("en-GB");
  };

  const getPercentageIcon = (percentage) => {
    if (percentage < 0) {
      return <StatArrow type="decrease" />;
    } else if (percentage > 0) {
      return <StatArrow type="increase" />;
    }
  };

  return (
    <>
      <Button
        leftIcon={<FaCalendarCheck fontSize="1rem" />}
        onClick={onOpen}
        variant="reports-button"
        bg="defaultColor.400"
        color="#fff"
        minW="18rem"
        mt="0.5rem"
        mb="0.5rem"
        mr="1rem"
      >
        {buttonText}
      </Button>
      <Modal isCentered size="full" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pt="1.5rem" bg="defaultColor.400" color="#fff">
          <ModalHeader mb="-1rem">{modalTitle}</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <Box
              border="2px solid #fff"
              borderRadius="7px"
              mt="0rem"
              w="100%"
              h="100%"
              textAlign="center"
              position="relative"
              display="flex"
            >
              <Text
                position="absolute"
                right="0.2rem"
                top="-2rem"
                fontSize="1.1rem"
                fontWeight="500"
              >
                Hoy es {formatDate()}
              </Text>
              <Box
                w="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                h="85vh"
              >
                <Box w="38rem">
                  {atTheMoment ? (
                    <Box
                      borderRadius="7px"
                      border="2px solid #fff"
                      p="0.3rem"
                      mb="1rem"
                    >
                      <StatGroup
                        minH="5rem"
                        p="0.5rem"
                        color="#fff"
                        alignItems="center"
                      >
                        <Text
                          position="relative"
                          fontSize="1.2rem"
                          fontWeight="500"
                          ml="1rem"
                          maxW="10rem"
                          minW="10rem"
                        >
                          A día de hoy
                        </Text>
                        <Stat>
                          <StatNumber>{dataQuantity}</StatNumber>
                        </Stat>
                      </StatGroup>
                    </Box>
                  ) : (
                    <>
                      <Box
                        borderRadius="7px"
                        border="2px solid #fff"
                        p="0.3rem"
                        mb="1rem"
                      >
                        <StatGroup
                          minH="5rem"
                          p="0.5rem"
                          color="#fff"
                          alignItems="center"
                        >
                          <Text
                            position="relative"
                            fontSize="1.2rem"
                            fontWeight="500"
                            ml="1rem"
                            maxW="10rem"
                            minW="10rem"
                          >
                            Hoy
                          </Text>
                          <Stat>
                            <StatNumber>{todayQuantity}</StatNumber>
                            <StatHelpText position="relative">
                              {getPercentageIcon(percentageTodayYesterday)}
                              {percentageTodayYesterday == 0 ||
                              percentageTodayYesterday == 100
                                ? "Igual en comparación  a ayer"
                                : `${percentageTodayYesterday}% en comparación  a ayer`}
                            </StatHelpText>
                          </Stat>
                        </StatGroup>
                      </Box>
                      <Box
                        borderRadius="7px"
                        border="2px solid"
                        p="1rem"
                        mb="1rem"
                      >
                        <StatGroup
                          minH="5rem"
                          p="0.5rem"
                          color="#fff"
                          alignItems="center"
                        >
                          <Text
                            position="relative"
                            fontSize="1.2rem"
                            fontWeight="500"
                            ml="1rem"
                            maxW="10rem"
                            minW="10rem"
                          >
                            Esta semana
                          </Text>

                          <Stat>
                            <StatNumber>{lastWeekQuantity}</StatNumber>
                            <StatHelpText>
                              {getPercentageIcon(percentageLastWeekTwoWeekAgo)}
                              {percentageLastWeekTwoWeekAgo == 0 ||
                              percentageLastWeekTwoWeekAgo == 100
                                ? "Igual en comparación a la semana pasada"
                                : `${percentageLastWeekTwoWeekAgo}% en comparación a la semana pasada`}
                            </StatHelpText>
                          </Stat>
                        </StatGroup>
                      </Box>
                      <Box
                        borderRadius="7px"
                        border="2px solid"
                        p="1rem"
                        mb="1rem"
                      >
                        <StatGroup
                          minH="5rem"
                          p="0.5rem"
                          color="#fff"
                          alignItems="center"
                        >
                          <Text
                            position="relative"
                            fontSize="1.2rem"
                            fontWeight="500"
                            ml="1rem"
                            maxW="10rem"
                            minW="10rem"
                          >
                            Este mes
                          </Text>

                          <Stat>
                            <StatNumber>{lastMonthQuantity}</StatNumber>
                            <StatHelpText>
                              {getPercentageIcon(
                                percentageLastMonthTwoMonthAgo
                              )}
                              {percentageLastMonthTwoMonthAgo == 0 ||
                              percentageLastMonthTwoMonthAgo == 100
                                ? "Igual en comparación al mes anterior"
                                : `${percentageLastMonthTwoMonthAgo}% en comparación al mes anterior`}
                            </StatHelpText>
                          </Stat>
                        </StatGroup>
                      </Box>
                      <Box
                        borderRadius="7px"
                        border="2px solid"
                        p="1rem"
                        mb="1rem"
                      >
                        <StatGroup
                          minH="5rem"
                          p="0.5rem"
                          color="#fff"
                          alignItems="center"
                        >
                          <Text
                            position="relative"
                            fontSize="1.2rem"
                            fontWeight="500"
                            ml="1rem"
                            maxW="10rem"
                            minW="10rem"
                          >
                            Este año
                          </Text>

                          <Stat>
                            <StatNumber>{lastYearQuantity}</StatNumber>
                            <StatHelpText>
                              {getPercentageIcon(percentageLastYearTwoYearsAgo)}
                              {percentageLastYearTwoYearsAgo == 0 ||
                              percentageLastYearTwoYearsAgo == 100
                                ? "Igual en comparación al año anterior"
                                : `${percentageLastYearTwoYearsAgo}% en comparación al año anterior`}
                            </StatHelpText>
                          </Stat>
                        </StatGroup>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportsByDate;
