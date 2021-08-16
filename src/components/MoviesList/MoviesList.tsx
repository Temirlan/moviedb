import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { Wrap, Flex, Spinner } from '@chakra-ui/react';
import { MoviePreview } from './../../models/index';
import MovieItem from '../MovieItem';

interface Props {
  isLoading: boolean;
  loadMore: (page: number) => void;
  hasMore: boolean;
  items: MoviePreview[];
  getGenresNames: (genresIds: MoviePreview['genre_ids']) => React.ReactNode;
}

const MoviesList: React.FC<Props> = ({ isLoading, loadMore, hasMore, items, getGenresNames }) => {
  const loader = (
    <Flex key={0} p={3} justify="center" align="center">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
    </Flex>
  );

  return (
    <InfiniteScroll pageStart={0} loadMore={loadMore} hasMore={hasMore} loader={loader}>
      <div>
        {isLoading && (
          <Flex height="300px" justify="center" align="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="teal.500"
              size="xl"
            />
          </Flex>
        )}
        <Wrap visibility={isLoading ? 'hidden' : 'visible'} pt={3} justify="center">
          {items.map((item) => (
            <MovieItem key={item.id} item={item} getGenresNames={getGenresNames} />
          ))}
        </Wrap>
      </div>
    </InfiniteScroll>
  );
};

export default MoviesList;
