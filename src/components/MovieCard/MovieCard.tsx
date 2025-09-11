// import React from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <li className={css.movieItem}>
      <h3>{movie.title}</h3>
      <p>{movie.release_date}</p>
    </li>
  );
}

