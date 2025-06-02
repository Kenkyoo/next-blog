// pages/myposts.tsx

import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import Main from "../ui/stack";
import Subtitle from "../ui/subtitle";
import GridCols from "@/ui/grid";
import { Avatar, Card, HStack, Stack, Text } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    res.statusCode = 403;
    return { props: { myPosts: [] } };
  }

  const myPosts = await prisma!.post.findMany({
    where: {
      author: { email: session.user.email ?? undefined },
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: {
      myPosts,
    },
  };
};

type Props = {
  myPosts: PostProps[];
};

const MyPosts: React.FC<Props> = ({ myPosts }) => {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Posts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  if (status === "authenticated") {
    const userImage = session.user?.image || "";

    return (
      <Layout>
        <GridCols>
          <Subtitle text="My profile" />
          <Card.Root my="4" shadow="xl">
            <Card.Body>
              <HStack mb="6" gap="3">
                <Avatar.Root>
                  <Avatar.Image src={userImage} />
                  <Avatar.Fallback name="Nate Foss" />
                </Avatar.Root>
                <Stack>
                  <Text fontWeight="semibold" fontSize="sm">
                    {session.user?.name}
                  </Text>
                </Stack>
              </HStack>
              <Card.Description>{session.user?.email}</Card.Description>
            </Card.Body>
          </Card.Root>

          <Subtitle text="My posts" />
          <Main>
            {myPosts.map((post) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))}
          </Main>
        </GridCols>
      </Layout>
    );
  }

  return <Link href="/api/auth/signin">Sign in</Link>;
};

export default MyPosts;
