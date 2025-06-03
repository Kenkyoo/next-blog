import React from "react";
import Layout from "@/components/Layout";
import Post, { PostProps } from "@/components/Post";
import prisma from "@/lib/prisma";
import Main from "@/ui/stack";
import Subtitle from "@/ui/subtitle";
import GridCols from "@/ui/grid";
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
      <Subtitle text={`Posts tagged with "${tag.name}`} />
      <GridCols>
        <Main>
          {tag.posts.length === 0 ? (
            <Subtitle text="No posts found" />
          ) : (
            tag.posts.map((post: PostProps) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))
          )}
        </Main>
      </GridCols>
    </Layout>
  );
};

export default Tag;
