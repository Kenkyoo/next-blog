import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Router from "next/router";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";

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
      <form onSubmit={updateData}>
        <h1>Edit Post</h1>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
        />
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
        />
        <input disabled={!title || !content} type="submit" value="Update" />
        <button onClick={() => Router.push(`/post/${id}`)}>Cancel</button>
      </form>
    </Layout>
  );
};

export default EditPost;
