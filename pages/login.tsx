// pages/login.tsx
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import type { ClientSafeProvider } from "next-auth/react";
import {
  Button,
  Card,
  Heading,
  Highlight,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import Footer from "@/components/Footer";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignIn() {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <Center minH="100vh" py="12" px="8">
      <Stack
        direction="column"
        gap="4"
        maxW="md"
        w="full"
        align="center"
        justify="center"
      >
        <Stack>
          <Heading px="4" size="3xl" letterSpacing="tight">
            <Highlight query="with speed" styles={{ color: "teal.600" }}>
              Create accessible account with speed
            </Highlight>
          </Heading>
          <Text fontSize="md" color="fg.muted">
            Blog app is a simple, modular and accessible component that gives
            you the building posts you need.
          </Text>
        </Stack>
        <Card.Root mt="8" variant="elevated" shadow="lg" maxW="lg">
          <Card.Header>
            <Card.Title>Sign up</Card.Title>
            <Card.Description>
              Fill in the form below to create an account
            </Card.Description>
          </Card.Header>
          <Card.Body>
            <Stack gap="4" w="full">
              {providers &&
                Object.values(providers).map((provider) => {
                  const isGoogle = provider.id === "google";
                  const isGithub = provider.id === "github";

                  return (
                    <Button
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      bg={isGoogle ? "red.600" : isGithub ? "teal.600" : "blue"}
                      variant="solid"
                      w="full"
                      {...(isGoogle ? (
                        <FcGoogle />
                      ) : isGithub ? (
                        <FaGithub />
                      ) : undefined)}
                    >
                      Iniciar sesión con {provider.name}
                    </Button>
                  );
                })}
            </Stack>
          </Card.Body>
          <Card.Footer justifyContent="center">
            <Text fontSize="sm" color="gray.500">
              No se almacenará ninguna contraseña.
            </Text>
          </Card.Footer>
        </Card.Root>
        <Footer />
      </Stack>
    </Center>
  );
}
