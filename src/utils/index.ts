import PlugPosterSvg from '../assets/images/plug-poster.svg';
import { TMDB_GET_POSTER_URL } from './../constants';

type GetPosterPathParams = {
  baseUrl?: string;
  size?: string;
  filePath: string | null;
};

export const getPosterPath = ({
  baseUrl = TMDB_GET_POSTER_URL,
  size = 'w500',
  filePath,
}: GetPosterPathParams) => {
  if (!filePath) return PlugPosterSvg;

  return `${baseUrl}/${size}${filePath}`;
};
