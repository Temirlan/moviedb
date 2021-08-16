import { Genre, MoviePreview } from './../models/index';

export type SearchQueryParams = {
  query: string;
  page: number;
};

export type ResponseSearchMovies = {
  page: number;
  results: MoviePreview[];
  total_results: number;
  total_pages: number;
};

export type ResponseGenresList = {
  genres: Genre[];
};
