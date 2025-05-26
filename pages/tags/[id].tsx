import React from "react";
import Layout from "@/components/Layout";
import Post, { PostProps } from "@/components/Post";
import prisma from "@/lib/prisma";

import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const tag = await prisma!.tag.findUnique({
    where: {
      name: String(params?.id),
    },
    include: {
      posts: {
        include: {
          author: true,
          tags: true,
        },
      },
    },
  });

  if (!tag) {
    return {
      notFound: true,
    };
  }
  return {
    props: { tag },
    revalidate: 10,
  };
};

type Props = {
  tag: {
    name: string;
    posts: PostProps[];
  };
};

const Tag: React.FC<Props> = ({ tag }) => {
  return (
    <Layout>
      <div className="page">
        <h1>Posts con el tag: #{tag.name}</h1>
        <main>
          {tag.posts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Tag;
