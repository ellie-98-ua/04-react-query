import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li
          key={movie.id}
          className={css.movieItem}
          onClick={() => onSelect(movie)}
        >
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
        </li>
      ))}
    </ul>
  );
}
