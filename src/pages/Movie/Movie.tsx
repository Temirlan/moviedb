import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MainLayout } from '../../layouts';
import { MoviePreview, Movie as IMovie } from './../../models';
import TmdbService from './../../services/TmdbService';
import { Box, Flex, Heading, Image, Text, Link, Badge } from '@chakra-ui/react';
import { getPosterPath } from './../../utils/index';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { ResponseSearchMovies } from '../../types';
import { MoviesList } from '../../components';
import ActionMovieFavorite from './../../components/ActionMovieFavorite/ActionMovieFavorite';

interface Props {
  getGenresNames: (genresIds: MoviePreview['genre_ids']) => React.ReactNode;
}

const Movie: React.FC<Props> = ({ getGenresNames }) => {
  const [recommendedMovies, setRecommendedMovies] = React.useState<
    ResponseSearchMovies | undefined
  >();
  const [movie, setMovie] = React.useState<IMovie>({} as IMovie);
  const [isLoading, setIsLoading] = React.useState(false);
  const params: Record<string, string> = useParams();
  const history = useHistory();
  const movieId = params.id;

  const hasMore = React.useMemo(
    () =>
      recommendedMovies?.total_pages
        ? recommendedMovies?.total_pages > recommendedMovies.page
        : false,
    [recommendedMovies?.page, recommendedMovies?.total_pages],
  );

  const loadMore = React.useCallback(async () => {
    const nextPage = (recommendedMovies?.page ?? 1) + 1;

    if (!hasMore) return;

    try {
      const data = await TmdbService.getRecommendedListForMovie(movieId, {
        page: nextPage,
      });
      setRecommendedMovies((prev) => ({
        ...data,
        results: [...(prev?.results as []), ...data.results],
      }));
    } catch (error) {
      console.warn(error);
    }
  }, [hasMore, movieId, recommendedMovies?.page]);

  React.useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);

        const recommendedMoviesPromise = TmdbService.getRecommendedListForMovie(movieId, {
          page: 1,
        });

        const getMoviePromise = TmdbService.getMovieById(movieId);

        const [recommendedMoviesResponse, getMovieResponse] = await Promise.all([
          recommendedMoviesPromise,
          getMoviePromise,
        ]);

        setMovie(getMovieResponse);
        setRecommendedMovies(recommendedMoviesResponse);
      } catch (error) {
        console.warn(error);
        history.push('/');
      }
      setIsLoading(false);
    };

    load();
  }, [movieId]);

  return (
    <MainLayout>
      {!isLoading && (
        <>
          <Flex alignItems="center" justify="space-between">
            <Heading p={3} as="h1" size="lg" isTruncated>
              {movie.title}
            </Heading>
            {movie && (
              <ActionMovieFavorite
                item={{
                  adult: movie.adult,
                  backdrop_path: movie.backdrop_path,
                  genre_ids: (movie.genres || []).map((g) => g.id),
                  id: movie.id,
                  original_language: movie.original_language,
                  original_title: movie.original_title,
                  overview: movie.overview,
                  popularity: movie.popularity,
                  poster_path: movie.poster_path,
                  release_date: movie.release_date,
                  title: movie.title,
                  video: movie.video,
                  vote_average: movie.vote_average,
                  vote_count: movie.vote_count,
                }}
                btnSize="sm"
              />
            )}
          </Flex>

          <Flex as="h1">
            <Image
              src={getPosterPath({
                filePath: movie.poster_path,
              })}
              height="429px"
              borderRadius="2%"
              alt={movie.title}
            />
            <Box ml={3}>
              <Text py={1} fontSize="md">
                <Badge>Original title: </Badge> {movie.original_title}
              </Text>
              <Text py={1} fontSize="md">
                <Badge>Original Language:</Badge> {movie.original_language}
              </Text>
              <Text py={1} maxWidth="600px" fontSize="md">
                <Badge>Overview:</Badge> {movie.overview}
              </Text>
              <Text py={1} fontSize="md">
                <Badge>Budget:</Badge> {movie.budget}
              </Text>
              <Text py={1} fontSize="md">
                <Badge>Revenue:</Badge> {movie.revenue}
              </Text>
              <Text py={1} fontSize="md">
                <Badge>Popularity:</Badge> {movie.popularity}
              </Text>
              {movie.homepage && (
                <Text py={1} fontSize="md">
                  <Badge>Homepage:</Badge>
                  <Link href={movie.homepage} isExternal>
                    {movie.homepage} <ExternalLinkIcon mx="2px" />
                  </Link>
                </Text>
              )}
              <Text py={1} fontSize="md">
                <Badge>Vote Average:</Badge> {movie.vote_average}
              </Text>
              <Text py={1} fontSize="md">
                <Badge>Votes:</Badge> {movie.vote_count}
              </Text>

              <Box py={1}>
                <Badge>Production Companies:</Badge>
                {movie.production_companies?.map((c) => c.name).join(', ')}
              </Box>

              <Box py={1}>
                <Badge>Production Countries:</Badge>
                {movie.production_countries?.map((c) => c.name).join(', ')}
              </Box>

              <Box py={1}>
                <Badge>Genres:</Badge> {movie.genres?.map((c) => c.name).join(', ')}
              </Box>
            </Box>
          </Flex>

          <Heading p={3} as="h2" size="lg" isTruncated>
            Recommendations:
          </Heading>
          {recommendedMovies && (
            <MoviesList
              getGenresNames={getGenresNames}
              items={recommendedMovies.results}
              hasMore={hasMore}
              isLoading={isLoading}
              loadMore={loadMore}
            />
          )}
        </>
      )}
    </MainLayout>
  );
};

export default Movie;
