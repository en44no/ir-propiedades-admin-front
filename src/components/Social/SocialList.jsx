import React from "react";
import SocialCard from "./SocialCard";
import { FaFacebookF } from "react-icons/fa";
import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import mercadoLibreIcon from "../../assets/mercado-libre-icon.png";

const SocialList = (props) => {
  const { onlyIcons } = props;

  return (
    <>
      {onlyIcons ? (
        <HStack>
          <FaFacebookF />
          <Image h="12px" src={mercadoLibreIcon} alt="MercadoLibre" />
        </HStack>
      ) : (
        <>
          <Text fontSize="1rem" fontWeight="semibold" mb="2">
            Publicar en
          </Text>
          <VStack spacing="14px" justifyContent="center">
            <SocialCard
              appColor="#38529a"
              appName="Facebook"
              appIcon={<FaFacebookF />}
            />
            <SocialCard
              appColor="#cc9f0b"
              appName="MercadoLibre"
              appIcon={<Image src={mercadoLibreIcon} alt="MercadoLibre" />}
            />
          </VStack>
        </>
      )}
    </>
  );
};

export default SocialList;
