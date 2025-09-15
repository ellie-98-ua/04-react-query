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
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className={css.poster}
            />
          ) : (
            <div className={css.noPoster}>No image</div>
          )}
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
        </li>
      ))}
    </ul>
  );
}
