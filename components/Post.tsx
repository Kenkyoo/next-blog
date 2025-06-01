import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { Tag, Button, Card, HStack, Box } from "@chakra-ui/react";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  tags?: { name: string }[];
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const MAX_CHARS = 150; // Puedes ajustar este valor

  const truncatedContent =
    post.content.length > MAX_CHARS
      ? post.content.substring(0, MAX_CHARS) + "..."
      : post.content;

  return (
    <Card.Root
      animationName="shakeX"
      animationDuration="1s"
      animationTimingFunction="ease-in-out"
      animationIterationCount="infinite"
      shadow="inner"
      variant="subtle"
      size="md"
      w="full"
    >
      <Card.Body>
        <Card.Title mb="2">{post.title}</Card.Title>
        <Card.Description as="div">
          <Box
            textOverflow="ellipsis" // Añade "..." al final si se trunca
            overflow="hidden" // Oculta el contenido excedente
            maxHeight="auto" // Opcional: puedes fijar una altura si lo deseas, por ejemplo, height="80px"
          >
            <ReactMarkdown>{truncatedContent}</ReactMarkdown>
          </Box>
        </Card.Description>
        <HStack mt="2">By {authorName}</HStack>
        <HStack mt="2">
          {post.tags &&
            post.tags.length > 0 &&
            post.tags.map((tag, index) => (
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
      </Card.Body>
      <Card.Footer>
        <Button
          bg={{ base: "gray.950", _dark: "gray.50" }}
          color={{ base: "gray.50", _dark: "gray.950" }}
          variant="solid"
          px="4"
          onClick={() => Router.push("/post/[id]", `/post/${post.id}`)}
        >
          Leer
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default Post;
