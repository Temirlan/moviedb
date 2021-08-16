import React from 'react';
import { Button, ThemeTypings, Tooltip } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { MoviePreview } from './../../models';
import useFavorites from './../../hooks/useFavorites';

interface Props {
  item: MoviePreview;
  btnSize?: ThemeTypings['components']['Button']['sizes'];
}

const ActionMovieFavorite: React.FC<Props> = ({ item, btnSize = 'xs' }) => {
  const { favorites, setFavorites } = useFavorites();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    const favoritesStorage = localStorage.getItem('favorites');

    if (favorites.find((f) => f.id === item.id)) {
      setFavorites(() => {
        const result = JSON.parse(favoritesStorage ?? '[]').filter(
          (i: MoviePreview) => i.id !== item.id,
        );

        localStorage.setItem('favorites', JSON.stringify(result));

        return result;
      });
    } else {
      setFavorites(() => {
        const result = [...JSON.parse(favoritesStorage ?? '[]'), item];

        localStorage.setItem('favorites', JSON.stringify(result));

        return result;
      });
    }
  };

  const isFavorite = favorites.find((f) => f.id === item.id);

  return (
    <Tooltip label={isFavorite ? 'Remove from favorites' : 'Add to favorites'} fontSize="md">
      <Button
        onClick={handleClick}
        colorScheme="teal"
        variant={isFavorite ? 'solid' : 'outline'}
        size={btnSize}
        ml={1}>
        <CopyIcon />
      </Button>
    </Tooltip>
  );
};

export default ActionMovieFavorite;
