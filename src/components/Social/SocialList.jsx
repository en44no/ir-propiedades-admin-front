import React from "react";
import SocialCard from "./SocialCard";
import { FaFacebookF } from "react-icons/fa";
import { Image, Text, VStack } from "@chakra-ui/react";

const SocialList = () => {
  return (
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
          appColor="#e4b30e"
          appName="MercadoLibre"
          appIcon={
            <Image src="https://i.postimg.cc/vBbmvVhf/Capture-removebg-preview.png" alt="MercadoLibre" />
          }
        />
      </VStack>
    </>
  );
};

export default SocialList;
