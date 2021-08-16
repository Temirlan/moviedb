import React from 'react';
import { MoviePreview } from './../models/index';
import equal from 'deep-equal';

const useFavorites = () => {
  const [favorites, setFavorites] = React.useState<MoviePreview[]>([]);

  const getFavorites = () => {
    const favoritesStorage = localStorage.getItem('favorites');

    if (favoritesStorage) {
      const f = JSON.parse(favoritesStorage);

      if (Array.isArray(f) && !equal(f, favorites)) {
        setFavorites(f);
      }
    }
  };

  React.useEffect(() => {
    getFavorites();
  }, []);

  return {
    favorites,
    setFavorites,
  };
};

export default useFavorites;
