// pages/blog.tsx
import React from "react";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import useSWR from "swr";
import Main from "../ui/stack";
import Title from "../ui/heading";
import Subtitle from "../ui/subtitle";
import GridCols from "@/ui/grid";
// Importa los componentes de paginación de Chakra UI
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Pagination } from "@chakra-ui/react"; // Asegúrate de que esta importación sea correcta si el componente de paginación está en un paquete específico o si la importación anterior es de un componente personalizado. Si es un componente custom, el import es relativo
import Loader from "@/ui/loader";

// Define el tipo de la respuesta de la API para mejor tipado
interface ApiResponse {
  feed: PostProps[];
  totalPosts: number;
  currentPage: number;
  pageSize: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Posts = () => {
  const [page, setPage] = React.useState(1);

  const { data, error } = useSWR<ApiResponse>(
    `/api/posts?page=${page}`,
    fetcher
  );

  if (error) return <div>Error fetching posts</div>;
  if (!data) return <Loader />;

  const { feed, totalPosts, pageSize } = data;

  return (
    <Layout>
      <GridCols>
        <Title />
        <Main>
          {feed.length === 0 ? (
            <Subtitle text="No posts found" />
          ) : (
            feed.map((post: PostProps) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))
          )}
        </Main>

        {/* Integración del componente de paginación de Chakra UI */}
        <Pagination.Root
          count={totalPosts}
          pageSize={pageSize}
          page={page}
          onPageChange={(nextPage) => setPage(nextPage.page)}
          mb="6"
        >
          <ButtonGroup variant="outline" size="sm">
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(itemPage) => (
                <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                  {itemPage.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </GridCols>
    </Layout>
  );
};

export default Posts;
