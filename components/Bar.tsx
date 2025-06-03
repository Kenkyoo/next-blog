"use client";

import { Box, Button, Text, Stack } from "@chakra-ui/react";
import { createIcon } from "@chakra-ui/react";

const HeartIcon = createIcon({
  displayName: "HeartIcon",
  path: (
    <>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        fill="currentColor"
        d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
      />
    </>
  ),
});

const Bar = () => {
  return (
    <Box
      bgGradient="to-r"
      gradientFrom="cyan.600"
      gradientTo="purple.600"
      width="100%"
      maxW="full"
      color="white"
      shadow="md"
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        gap="4"
        direction="row"
      >
        <Text textStyle="sm">Sphinx of black quartz, judge my vow.</Text>
        <HeartIcon size="lg" color="blue.400" />
        <Button px="2" variant="outline" rounded="l2">
          Hi!
        </Button>
      </Stack>
    </Box>
  );
};

export default Bar;
