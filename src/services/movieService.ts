import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  if (!query) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }

  const response = await axios.get<MoviesResponse>(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
  });

  return response.data;
};
