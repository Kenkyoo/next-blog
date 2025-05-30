import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { Container, Box, Flex } from "@chakra-ui/react";
import { Heading, Highlight, Text } from "@chakra-ui/react";

const Login = () => {
  return (
    <Container textStyle="body" fluid>
      <Flex
        minH="100vh" // Ocupa el 100% del alto del viewport
        minW="100vw" // Ocupa el 100% del ancho del viewport
        align="center" // Centra verticalmente los elementos hijos
        justify="center" // Centra horizontalmente los elementos hijos
        flexDirection="column"
        gap="8"
        // Puedes ajustar el color de fondo si lo deseas
        // bg="gray.100"
      >
        <Stack>
          <Heading size="3xl" letterSpacing="tight">
            <Highlight query="with speed" styles={{ color: "teal.600" }}>
              Create accessible React apps with speed
            </Highlight>
          </Heading>
          <Text fontSize="md" color="fg.muted">
            Chakra UI is a simple, modular and accessible component library that
            gives you the building blocks you need.
          </Text>
        </Stack>
        <Box
          bg="bg.subtle"
          borderWidth="1px"
          borderColor="border.disabled"
          p="8"
        >
          <Fieldset.Root>
            <Stack>
              <Fieldset.Legend>Contact details</Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide your contact details below.
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Name</Field.Label>
                <Input name="name" />
              </Field.Root>

              <Field.Root>
                <Field.Label>Email address</Field.Label>
                <Input name="email" type="email" />
              </Field.Root>
            </Fieldset.Content>

            <Button type="submit" alignSelf="flex-start">
              <Link href="/api/auth/signin">Log in</Link>
            </Button>
          </Fieldset.Root>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;
