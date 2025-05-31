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

  const drafts = await prisma!.post.findMany({
    where: {
      author: { email: session.user.email ?? undefined },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <GridCols>
        <Subtitle
          text={
            props.drafts && props.drafts.length > 0 ? "My drafts" : "No drafts"
          }
        />
        <Main>
          {props.drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </Main>
      </GridCols>
    </Layout>
  );
};

export default Drafts;
