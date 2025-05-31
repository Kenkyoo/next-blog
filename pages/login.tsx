import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { Container, Box, Flex } from "@chakra-ui/react";
import { Heading, Highlight, Text } from "@chakra-ui/react";
import Footer from "../components/Footer";
const Login = () => {
  return (
    <Container textStyle="body" fluid>
      <Flex
        align="center" // Centra verticalmente los elementos hijos
        justify="center" // Centra horizontalmente los elementos hijos
        flexDirection="column"
        gap="4"
        // Puedes ajustar el color de fondo si lo deseas
        // bg="gray.100"
      >
        <Box p="4" color="fg.disabled" textStyle="body" spaceY="8">
          <Stack>
            <Heading size="3xl" letterSpacing="tight">
              <Highlight query="with speed" styles={{ color: "teal.600" }}>
                Create accessible React apps with speed
              </Highlight>
            </Heading>
            <Text fontSize="md" color="fg.muted">
              Chakra UI is a simple, modular and accessible component library
              that gives you the building blocks you need.
            </Text>
          </Stack>
          <Box
            borderWidth="1px"
            borderColor="border.disabled"
            color="fg.disabled"
            textStyle="body"
            spaceY="4"
            minH="80vh"
            bg="bg.subtle"
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

              <Button
                bg={{ base: "gray.950", _dark: "gray.50" }}
                color={{ base: "gray.50", _dark: "gray.950" }}
                variant="solid"
                px="4"
                type="submit"
                alignSelf="center"
              >
                <Link href="/api/auth/signin">Log in with Github</Link>
              </Button>
            </Fieldset.Root>
          </Box>
        </Box>
      </Flex>
      <Footer />
    </Container>
  );
};

export default Login;
