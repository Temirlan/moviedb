import React from 'react';
import { MoviesList, SearchForm } from '../../components';
import { MainLayout } from '../../layouts';
import { ResponseSearchMovies } from '../../types';
import TmdbService from './../../services/TmdbService';
import { MoviePreview } from './../../models/index';
import { FormikHelpers } from 'formik';
import { SearchFormValues } from './../../components/SearchForm/SearchForm';

interface Props {
  searchMovies: ResponseSearchMovies;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSearchMovies: React.Dispatch<React.SetStateAction<ResponseSearchMovies | undefined>>;
  getGenresNames: (genresIds: MoviePreview['genre_ids']) => React.ReactNode;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchMovies: React.FC<Props> = ({
  searchMovies,
  searchQuery,
  setSearchMovies,
  getGenresNames,
  isLoading,
  setSearchQuery,
  setIsLoading,
}) => {
  const hasMore = React.useMemo(
    () => (searchMovies.total_pages ? searchMovies.total_pages > searchMovies.page : false),
    [searchMovies.page, searchMovies.total_pages],
  );

  const loadMore = React.useCallback(async () => {
    const nextPage = (searchMovies.page ?? 1) + 1;

    if (!hasMore) return;

    try {
      const data = await TmdbService.searchMovies({
        query: searchQuery,
        page: nextPage,
      });
      setSearchMovies({
        ...data,
        results: [...(searchMovies.results as []), ...data.results],
      });
    } catch (error) {
      console.warn(error);
    }
  }, [hasMore, searchMovies.page, searchMovies.results, searchQuery, setSearchMovies]);

  const onSubmit = async (values: SearchFormValues, actions: FormikHelpers<SearchFormValues>) => {
    try {
      setIsLoading(true);
      const data = await TmdbService.searchMovies({
        query: values.search,
        page: 1,
      });

      setSearchMovies(data);
      setSearchQuery(values.search);
    } catch (error) {
      console.warn(error);
    }

    actions.setSubmitting(false);
    setIsLoading(false);
  };

  return (
    <MainLayout>
      <SearchForm onSubmit={onSubmit} initialValues={{ search: searchQuery }} />
      <MoviesList
        getGenresNames={getGenresNames}
        items={searchMovies.results}
        hasMore={hasMore}
        isLoading={isLoading}
        loadMore={loadMore}
      />
    </MainLayout>
  );
};

export default SearchMovies;
