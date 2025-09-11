import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import SearchForm from "../SearchForm/SearchForm";
import { fetchMovies } from "../../services/movieService";
import type { Movie, MoviesResponse } from "../../types/movie";
import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery<MoviesResponse, Error>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.length > 0,
  });

  const totalPages = data?.total_pages || 0;

  return (
    <div className={css.container}>
      <SearchForm
        onSubmit={(q) => {
          setQuery(q);
          setPage(1);
        }}
      />

      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching movies</p>}

      <ul className={css.moviesList}>
        {data?.results.map((movie: Movie) => (
          <li key={movie.id} className={css.movieItem}>
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
          </li>
        ))}
      </ul>

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
    </div>
  );
}
