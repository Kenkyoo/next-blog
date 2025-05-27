// pages/search.tsx
import React from "react";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";
// Define el tipo de la respuesta de la API para mejor tipado
interface ApiResponse {
  feed: PostProps[];
  totalPosts: number;
  currentPage: number;
  pageSize: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Result = () => {
  // const router = useRouter(); // Inicializar useRouter
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState<string>(""); // Nuevo estado para el valor del input

  // Determinar la query real que se enviará a la API
  const apiQuery = searchTerm.trim(); // Elimina espacios en blanco al inicio/final

  // Construir la URL de SWR dinámicamente
  // useSWR solo se ejecutará si apiQuery está definido (o es una cadena vacía)
  const { data, error, mutate } = useSWR<ApiResponse>(
    `/api/search?page=${page}&query=${encodeURIComponent(apiQuery)}`, // Codifica la query
    fetcher
  );

  // Reinicia la paginación cuando cambia la búsqueda
  React.useEffect(() => {
    setPage(1);
    mutate(); // Forzar una re-validación de SWR para la nueva búsqueda
  }, [apiQuery, mutate]); // Dependencia en apiQuery para detectar cambios en la búsqueda

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setSearchTerm(value);
    },
    // delay in ms
    1000
  );

  if (error) return <div>Error fetching posts.</div>;
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
        <h1>Public Feed Search</h1>
        <input
          type="text"
          value={searchTerm} // Controla el valor del input
          onChange={(e) => debounced(e.target.value)} // Actualiza searchTerm
          placeholder="Search by title..."
        />
        <main>
          {feed.length === 0 ? (
            <div>No posts found for &quot;{apiQuery}&quot;.</div>
          ) : (
            feed.map((post: PostProps) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))
          )}
        </main>
        {totalPosts > 0 && ( // Solo muestra los controles si hay posts
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
        )}
      </div>
      <style jsx>{`
        input[type="text"] {
          width: 100%;
          padding: 0.8rem;
          margin-bottom: 2rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }

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
          gap: 1rem;
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

export default Result;
