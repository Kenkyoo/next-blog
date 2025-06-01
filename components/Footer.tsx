import { Box, Center, Text } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { HiHeart } from "react-icons/hi";
const Footer = () => {
  return (
    <Box width="100%" padding="8">
      <Center px="8" py="6">
        <Text> Dev by Kenkyo</Text>
        <Icon size="lg" color="pink.700" hideBelow="md">
          <HiHeart />
        </Icon>
      </Center>
    </Box>
  );
};

export default Footer;
