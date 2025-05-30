import { Box, Highlight, Stack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box width="100%" padding="8">
      <Stack direction="row" gap="4" align="center" justify="center">
        <Highlight query="component" styles={{ fontWeight: "semibold" }}>
          With the Highlight component, you can spotlight words.
        </Highlight>
      </Stack>
    </Box>
  );
};

export default Footer;
