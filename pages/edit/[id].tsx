import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Router from "next/router";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import {
  Field,
  Fieldset,
  Input,
  Textarea,
  Stack,
  Box,
  Center,
  Button,
} from "@chakra-ui/react";
import Subtitle from "@/ui/subtitle";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma!.post.findUnique({
    where: { id: String(params?.id) },
  });

  if (!post) {
    return { notFound: true };
  }

  return {
    props: post,
  };
};

const EditPost: React.FC<{ id: string; title: string; content: string }> = ({
  id,
  title: initialTitle,
  content: initialContent,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const updateData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch(`/api/post/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push(`/post/${id}`);
    } catch (error) {
      console.error(error);
    }
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
          bg="bg.subtle"
        >
          <Subtitle text="Edit post" />
          <Fieldset.Root colorPalette="gray" size="lg" maxW="md">
            <Stack>
              <Fieldset.Legend>New draft</Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide your post details below.
              </Fieldset.HelperText>
            </Stack>
            <form onSubmit={updateData}>
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label>Title</Field.Label>
                  <Input
                    variant="outline"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    type="text"
                    value={title}
                    name="title"
                  />
                </Field.Root>
                <Textarea
                  variant="outline"
                  cols={50}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Content"
                  rows={8}
                  value={content}
                />
              </Fieldset.Content>
              <Input
                disabled={!title || !content}
                type="submit"
                value="Update"
                bg={{ base: "gray.950", _dark: "gray.50" }}
                color={{ base: "gray.50", _dark: "gray.950" }}
                size="md"
                my="4"
              />
              <Button onClick={() => Router.push(`/post/${id}`)}>Cancel</Button>
            </form>
          </Fieldset.Root>
        </Box>
      </Center>
    </Layout>
  );
};

export default EditPost;
