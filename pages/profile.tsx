import { useSession } from "next-auth/react";
import Link from "next/link";
import MyPosts from "./myPosts";
import Layout from "../components/Layout";
import {
  Container,
  Box,
  Flex,
  Avatar,
  Card,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function Component() {
  const { data: session, status } = useSession();
  console.log(session?.user);
  const userImage = session?.user?.image as string;

  if (status === "authenticated") {
    return (
      <Layout>
        <Container textStyle="body" fluid>
          <Flex
            align="center" // Centra verticalmente los elementos hijos
            justify="center" // Centra horizontalmente los elementos hijos
            flexDirection="column"
            gap="4"
            // Puedes ajustar el color de fondo si lo deseas
            // bg="gray.100"
          >
            <Box
              p="4"
              borderWidth="1px"
              borderColor="border.disabled"
              color="fg.disabled"
              textStyle="body"
              spaceY="8"
            >
              <Card.Root width="320px">
                <Card.Body>
                  <HStack mb="6" gap="3">
                    <Avatar.Root>
                      <Avatar.Image src={userImage} />
                      <Avatar.Fallback name="Nate Foss" />
                    </Avatar.Root>
                    <Stack gap="0">
                      <Text fontWeight="semibold" textStyle="sm">
                        {session?.user?.name}
                      </Text>
                    </Stack>
                  </HStack>
                  <Card.Description>{session?.user?.email}</Card.Description>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card.Root>
              <MyPosts myPosts={[]} />
            </Box>
          </Flex>
        </Container>
      </Layout>
    );
  }

  return <Link href="/api/auth/signin">Sign in</Link>;
}
