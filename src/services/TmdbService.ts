import queryString from 'query-string';
import { ResponseGenresList, ResponseSearchMovies, SearchQueryParams } from '../types';
import { axios } from './../core/axios';
import { Movie } from './../models';

const TmdbService = {
  searchMovies: async (params: SearchQueryParams) => {
    const stringParams = queryString.stringify({
      ...params,
      query: params.query ? params.query : "''",
    });
    const { data } = await axios.get<ResponseSearchMovies>(`/search/movie?${stringParams}`);

    return data;
  },

  getRecommendedListForMovie: async (movieId: string, params: Record<string, number | string>) => {
    const stringParams = queryString.stringify(params);
    const { data } = await axios.get<ResponseSearchMovies>(
      `/movie/${movieId}/recommendations?${stringParams}`,
    );

    return data;
  },

  getMovieById: async (movieId: string) => {
    const { data } = await axios.get<Movie>(`/movie/${movieId}`);

    return data;
  },

  getGenresList: async () => {
    const { data } = await axios.get<ResponseGenresList>('/genre/movie/list');

    return data;
  },
};

export default TmdbService;
