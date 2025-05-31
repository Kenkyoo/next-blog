import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import Main from "../ui/stack";
import Subtitle from "../ui/subtitle";
import GridCols from "@/ui/grid";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
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
    props: { myPosts },
  };
};

type Props = {
  myPosts: PostProps[];
};

const MyPosts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Posts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <GridCols>
        <Subtitle text="My posts" />
        <Main>
          {props.myPosts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </Main>
      </GridCols>
    </Layout>
  );
};

export default MyPosts;
