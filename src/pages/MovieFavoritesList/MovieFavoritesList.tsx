import { Heading, Wrap } from '@chakra-ui/react';
import React from 'react';
import { MainLayout } from '../../layouts';
import useFavorites from './../../hooks/useFavorites';
import MovieItem from './../../components/MovieItem/MovieItem';
import { MoviePreview } from './../../models';

interface Props {
  getGenresNames: (genresIds: MoviePreview['genre_ids']) => React.ReactNode;
}

const MovieFavoritesList: React.FC<Props> = ({ getGenresNames }) => {
  const { favorites } = useFavorites();

  return (
    <MainLayout>
      <Heading p={3} as="h1" size="lg" isTruncated>
        Favorites List
      </Heading>

      <Wrap pt={3} justify="center">
        {favorites.map((favorite) => (
          <MovieItem key={favorite.id} item={favorite} getGenresNames={getGenresNames} />
        ))}
      </Wrap>
    </MainLayout>
  );
};

export default MovieFavoritesList;
