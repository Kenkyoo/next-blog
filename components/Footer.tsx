import { Box, Highlight, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { HiHeart } from "react-icons/hi";
const Footer = () => {
  return (
    <Box width="100%" padding="8">
      <Stack direction="row" align="center" justify="center">
        <Highlight query="component" styles={{ fontWeight: "semibold" }}>
          With the Highlight component.
        </Highlight>
        <Text>Dev by Kenkyo</Text>
        <Icon size="lg" color="pink.700" hideBelow="md">
          <HiHeart />
        </Icon>
      </Stack>
    </Box>
  );
};

export default Footer;
