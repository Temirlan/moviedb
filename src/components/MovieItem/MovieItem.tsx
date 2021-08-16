import React from 'react';
import { Box, Badge, Image, WrapItem, Button, Flex, Tooltip } from '@chakra-ui/react';
import { CopyIcon, StarIcon } from '@chakra-ui/icons';
import { getPosterPath } from './../../utils/index';
import { Link } from 'react-router-dom';
import { animateScroll } from 'react-scroll';
import { MoviePreview } from './../../models/index';
import ActionMovieFavorite from './../ActionMovieFavorite/ActionMovieFavorite';

interface Props {
  getGenresNames: (genresIds: MoviePreview['genre_ids']) => React.ReactNode;
  item: MoviePreview;
}

const MovieItem: React.FC<Props> = ({ getGenresNames, item }) => {
  const { id, poster_path, title, genre_ids, release_date, vote_average, vote_count } = item;

  return (
    <WrapItem onClick={() => animateScroll.scrollToTop()}>
      <Link to={`/movie/${id}`}>
        <Box height="100%" maxW="18rem" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image
            src={getPosterPath({
              filePath: poster_path,
            })}
            minHeight="429px"
            alt={title}
          />

          <Box p="6">
            <Flex justify="space-between">
              <Box d="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  Genres
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  ml="2">
                  {getGenresNames(genre_ids)}
                </Box>
              </Box>
              <ActionMovieFavorite item={item} />
            </Flex>

            <Box fontWeight="semibold" as="h4" lineHeight="tall" isTruncated>
              {title}
            </Box>

            <Box as="span" color="gray.600" fontSize="sm">
              {release_date}
            </Box>

            <Box d="flex" mt="2" alignItems="center">
              {Array(10)
                .fill('')
                .map((_, i) => (
                  <StarIcon key={i} color={i < vote_average ? 'teal.500' : 'gray.300'} />
                ))}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {vote_count} votes
              </Box>
            </Box>
          </Box>
        </Box>
      </Link>
    </WrapItem>
  );
};

export default MovieItem;
