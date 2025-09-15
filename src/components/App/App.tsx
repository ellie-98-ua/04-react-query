import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { Toaster, toast } from "react-hot-toast";
import SearchForm from "../SearchForm/SearchForm";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";

import type { Movie } from "../../types/movie";
import type { MoviesResponse } from "../../services/movieService";

import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isFetching, isError, isSuccess, error } = useQuery<MoviesResponse>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.length > 0,
    placeholderData: keepPreviousData,
  });

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 0;

  useEffect(() => {
    if (isSuccess && movies.length === 0) {
      toast("No movies found for your query");
    }
  }, [isSuccess, movies]);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.container}>
      <h1>Movie Search</h1>

      <SearchForm
        onSubmit={(q) => {
          setQuery(q);
          setPage(1);
        }}
      />

      {isFetching && query && <Loader />}

      {isError && error instanceof Error && (
        <ErrorMessage message={error.message} />
      )}

      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}
