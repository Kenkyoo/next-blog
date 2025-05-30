import { Box, Heading, Highlight, Stack, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box width="100%" padding="8" h="20">
      <Stack direction="row" gap="4">
        <Heading size="3xl" letterSpacing="tight">
          <Highlight query="with speed" styles={{ color: "teal.600" }}>
            Create accessible React apps with speed
          </Highlight>
        </Heading>
        <Text fontSize="md" color="fg.muted">
          Chakra UI is a simple.
        </Text>
      </Stack>
    </Box>
  );
};

export default Footer;
