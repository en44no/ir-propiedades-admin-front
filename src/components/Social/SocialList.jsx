import React from "react";
import SocialCard from "./SocialCard";
import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import mercadoLibreIcon from "../../assets/mercado-libre-icon.png";

const SocialList = (props) => {
  const { onlyIcons, isOnMercadoLibre } = props;

  return (
    <>
      {onlyIcons ? (
        <HStack>
          <Image
            loading="lazy"
            h="12px"
            src={mercadoLibreIcon}
            alt="MercadoLibre"
          />
        </HStack>
      ) : (
        <>
          <Text fontSize="1rem" fontWeight="semibold" mb="2">
            Publicar en
          </Text>
          <VStack spacing="14px" justifyContent="center">
            <SocialCard
              isOnMercadoLibre={isOnMercadoLibre}
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
