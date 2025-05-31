import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import {
  Field,
  Fieldset,
  Input,
  Textarea,
  Stack,
  Box,
  Center,
} from "@chakra-ui/react";
import Subtitle from "@/ui/subtitle";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState(""); // Nuevo estado

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {
        title,
        content,
        tags: tagsInput
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      };

      await fetch("/api/post", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
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
        >
          <Subtitle text="Create a new post" />
          <Fieldset.Root size="lg" maxW="md">
            <Stack>
              <Fieldset.Legend>New draft</Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide your post details below.
              </Fieldset.HelperText>
            </Stack>
            <form onSubmit={submitData}>
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
                <Field.Root>
                  <Field.Label>Tags</Field.Label>
                  <Input
                    variant="outline"
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Tags (separated by commas)"
                    type="text"
                    value={tagsInput}
                    name="tags"
                  />
                </Field.Root>
              </Fieldset.Content>
              <Input
                colorPalette="teal"
                disabled={!content || !title}
                type="submit"
                value="Create"
              />
              <a className="back" href="#" onClick={() => Router.push("/")}>
                or Cancel
              </a>
            </form>
          </Fieldset.Root>
        </Box>
      </Center>
    </Layout>
  );
};

export default Draft;
