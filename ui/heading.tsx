import { Heading, Highlight, Stack, Text } from "@chakra-ui/react";

const Title = () => {
  return (
    <Stack>
      <Heading size="3xl" letterSpacing="tight">
        <Highlight query="with speed" styles={{ color: "teal.600" }}>
          Feed
        </Highlight>
      </Heading>
      <Text fontSize="md" color="fg.muted">
        See what your friends are up to
      </Text>
    </Stack>
  );
};

export default Title;
