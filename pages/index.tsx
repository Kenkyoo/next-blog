// pages/blog.tsx
import React from "react";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import useSWR from "swr";

// Define el tipo de la respuesta de la API para mejor tipado
interface ApiResponse {
  feed: PostProps[];
  totalPosts: number;
  currentPage: number;
  pageSize: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Blog = () => {
  const [page, setPage] = React.useState(1);

  const { data, error } = useSWR<ApiResponse>(
    `/api/posts?page=${page}`,
    fetcher
  );

  if (error) return <div>Error fetching posts</div>;
  if (!data) return <div>Loading...</div>;

  const { feed, totalPosts, pageSize } = data;
  const totalPages = Math.ceil(totalPosts / pageSize);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {feed.length === 0 ? (
            <div>No posts found.</div>
          ) : (
            feed.map((post: PostProps) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))
          )}
        </main>
        <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </button>
        </div>
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

        .pagination-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
          gap: 1rem; /* Espacio entre los elementos */
        }

        .pagination-controls button {
          padding: 0.5rem 1rem;
          border: 1px solid #ccc;
          background-color: #f0f0f0;
          cursor: pointer;
          border-radius: 4px;
        }

        .pagination-controls button:disabled {
          background-color: #e0e0e0;
          color: #a0a0a0;
          cursor: not-allowed;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
