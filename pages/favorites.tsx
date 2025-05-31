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
  const userId = session?.user?.id;

  if (!session?.user) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const favorites = await prisma!.favorite.findMany({
    where: { userId },
    include: { post: true },
  });

  return {
    props: { favorites },
  };
};

type Props = {
  favorites: {
    id: string;
    post: PostProps;
  }[];
};

const Favorites: React.FC<Props> = (props) => {
  const { data: session } = useSession();
  console.log(props);
  console.log(props.favorites);
  if (!session) {
    return (
      <Layout>
        <h1>My Favorites</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <GridCols>
        <Subtitle text="Favorites" />
        <Main>
          {props.favorites.map((favorite) => (
            <div key={favorite.id} className="post">
              <Post post={favorite.post} />
            </div>
          ))}
        </Main>
      </GridCols>
    </Layout>
  );
};

export default Favorites;
