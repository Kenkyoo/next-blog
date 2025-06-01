// pages/search.tsx
import React from "react";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";
import Main from "../ui/stack";
import Subtitle from "../ui/subtitle";
import GridCols from "@/ui/grid";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Pagination } from "@chakra-ui/react"; // Asegúrate de que esta importación sea correcta si el componente de paginación está en un paquete específico o si la importación anterior es de un componente personalizado. Si es un componente custom, el import es relativo
import { Separator } from "@chakra-ui/react";
import { Input, InputGroup, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
// Define el tipo de la respuesta de la API para mejor tipado
interface ApiResponse {
  feed: PostProps[];
  totalPosts: number;
  currentPage: number;
  pageSize: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Result = () => {
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [query, setQuery] = React.useState("");

  const { data, error } = useSWR<ApiResponse>(
    `/api/search?page=${page}&query=${encodeURIComponent(query)}`,
    fetcher
  );

  const debounced = useDebouncedCallback((value: string) => {
    setPage(1); // Volver a la primera página cuando cambia la búsqueda
    setQuery(value);
  }, 1000);

  if (error) return <div>Error fetching posts</div>;
  if (!data) return <div>Loading...</div>;

  const { feed, totalPosts, pageSize } = data;

  return (
    <Layout>
      <Separator
        size="md"
        orientation="horizontal"
        colorPalette={{ base: "gray.50", _dark: "gray.950" }}
        variant="solid"
      />
      <GridCols>
        <Subtitle text="Search posts" />
        <InputGroup
          my="4"
          mx="auto"
          flex="1"
          startElement={<LuSearch />}
          endElement={<Kbd>⌘K</Kbd>}
        >
          <Input
            size="lg"
            w="full"
            type="text"
            placeholder="Search posts"
            value={searchValue}
            onChange={(e) => {
              const val = e.target.value;
              setSearchValue(val);
              debounced(val);
            }}
          />
        </InputGroup>
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

export default Result;
