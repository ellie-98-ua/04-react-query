import React from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=No+Image";

  return (
    <div className={css.card}>
      <img className={css.poster} src={posterUrl} alt={movie.title} />
      <div className={css.info}>
        <h3 className={css.title}>{movie.title}</h3>
        <p className={css.date}>{movie.release_date}</p>
        <p className={css.overview}>{movie.overview}</p>
      </div>
    </div>
  );
}
