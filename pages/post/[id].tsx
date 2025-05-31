import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { Box, Center } from "@chakra-ui/react";
import Subtitle from "@/ui/subtitle";
import { Text, HStack, Tag } from "@chakra-ui/react";
import { Button, Group } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!prisma) {
    throw new Error("Prisma client is not initialized");
  }
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
      tags: {
        select: { name: true },
      },
    },
  });

  if (!post) {
    return { notFound: true };
  }

  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

async function savePost(id: string, isFavorited: boolean): Promise<void> {
  await fetch(`/api/favorite/${id}`, {
    method: isFavorited ? "DELETE" : "POST",
    credentials: "include",
  });
  // Opcional: recargar o navegar si querés
  // Router.push("/");
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  const [isFavorited, setIsFavorited] = React.useState(false);
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  const handleFavorite = async () => {
    await savePost(props.id, isFavorited);
    setIsFavorited(!isFavorited);
  };

  return (
    <Layout>
      <Center px="8" py="6">
        <Box
          p="4"
          borderWidth="1px"
          borderColor="border.disabled"
          color="fg.disabled"
          textStyle="body"
          spaceY="4"
          minH="80vh"
        >
          <Subtitle text={title} />
          <Text fontWeight="semibold" textStyle="md">
            By {props?.author?.name || "Unknown author"}
          </Text>
          <Box letterSpacing="tighter">
            <ReactMarkdown>{props.content}</ReactMarkdown>
          </Box>
          {props.tags && props.tags.length > 0 && (
            <>
              <HStack>
                {props.tags.map((tag, index) => (
                  <Tag.Root
                    colorPalette="teal"
                    size="md"
                    variant="subtle"
                    key={index}
                  >
                    <Tag.Label onClick={() => Router.push(`/tags/${tag.name}`)}>
                      {tag.name}
                    </Tag.Label>
                  </Tag.Root>
                ))}
              </HStack>
            </>
          )}
          {userHasValidSession && postBelongsToUser && (
            <>
              <Group>
                <Button variant="outline" onClick={() => publishPost(props.id)}>
                  Publish
                </Button>
                <Button variant="outline" onClick={() => deletePost(props.id)}>
                  Delete
                </Button>
                <Button
                  variant="outline"
                  onClick={() => Router.push(`/edit/${props.id}`)}
                >
                  Edit
                </Button>
              </Group>
            </>
          )}
          {userHasValidSession && (
            <Button variant="ghost" onClick={handleFavorite}>
              {isFavorited ? "★ Favorito" : "☆ Guardar"}
            </Button>
          )}
        </Box>
      </Center>
    </Layout>
  );
};

export default Post;
