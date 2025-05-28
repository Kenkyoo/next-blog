import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

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
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown>{props.content}</ReactMarkdown>
        {props.tags && props.tags.length > 0 && (
          <div className="tags">
            {props.tags.map((tag, index) => (
              <button
                key={index}
                className="tag"
                onClick={() => Router.push(`/tags/${tag.name}`)}
              >
                #{tag.name}
              </button>
            ))}
          </div>
        )}
        <div className="actions">
          {userHasValidSession && postBelongsToUser && (
            <>
              <button onClick={() => publishPost(props.id)}>Publish</button>
              <button onClick={() => deletePost(props.id)}>Delete</button>
              <button onClick={() => Router.push(`/edit/${props.id}`)}>
                Edit
              </button>
            </>
          )}
          <button onClick={handleFavorite}>
            {isFavorited ? "★ Favorito" : "☆ Guardar"}
          </button>
        </div>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        .tags {
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          background-color: #f3f3f3;
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: 999px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: background-color 0.2s ease;
        }

        .tag:hover {
          background-color: #ddd;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
