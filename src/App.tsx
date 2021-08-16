import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Genre } from './models';
import TmdbService from './services/TmdbService';
import { ResponseSearchMovies } from './types';
import { SearchMovies } from './pages';
import Movie from './pages/Movie/Movie';
import { MoviePreview } from './models/index';
import MovieFavoritesList from './pages/MovieFavoritesList/MovieFavoritesList';

export const App = () => {
  const [searchMovies, setSearchMovies] = React.useState<ResponseSearchMovies | undefined>();
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [genres, setGenres] = React.useState<Genre[]>([]);
  const [isStartFetchingSearchMovies, setIsStartFetchingSearchMovies] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const load = async () => {
      try {
        setIsStartFetchingSearchMovies(true);
        const searchMoviesPromise = TmdbService.searchMovies({
          query: '',
          page: 1,
        });

        const getGenresListPromise = TmdbService.getGenresList();

        const [moviesResponse, genresResponse] = await Promise.all([
          searchMoviesPromise,
          getGenresListPromise,
        ]);

        setSearchMovies(moviesResponse);
        setGenres(genresResponse.genres);
      } catch (error) {
        console.warn(error);
      }
      setIsStartFetchingSearchMovies(false);
    };

    load();
  }, []);

  const getGenresNames = React.useCallback(
    (genresIds: MoviePreview['genre_ids']) => {
      return genres
        .filter((g) => genresIds.includes(g.id))
        .map((g) => {
          return g.name;
        })
        .join(' ● ');
    },
    [genres],
  );

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              {searchMovies && (
                <SearchMovies
                  setSearchMovies={setSearchMovies}
                  searchQuery={searchQuery}
                  searchMovies={searchMovies}
                  getGenresNames={getGenresNames}
                  isLoading={isStartFetchingSearchMovies}
                  setIsLoading={setIsStartFetchingSearchMovies}
                  setSearchQuery={setSearchQuery}
                />
              )}
            </Route>
            <Route exact path="/movie/favorites">
              <MovieFavoritesList getGenresNames={getGenresNames} />
            </Route>
            <Route exact path="/movie/:id">
              <Movie getGenresNames={getGenresNames} />
            </Route>
          </Switch>
        </div>
      </Router>
    </ChakraProvider>
  );
};
