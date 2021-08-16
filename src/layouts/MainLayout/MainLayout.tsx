import React from 'react';
import { Grid, Container, Divider, Link, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from './../../ColorModeSwitcher';
import { NavLink } from 'react-router-dom';

interface Props {
  children?: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Container maxW="container.xl">
      <Grid py={3}>
        <Flex alignItems="center" justify="space-between">
          <Flex>
            <Link fontSize="md" fontWeight="bold" color="teal.500" as={NavLink} to="/">
              Home
            </Link>

            <Link
              fontSize="md"
              fontWeight="bold"
              color="teal.500"
              ml={3}
              as={NavLink}
              to="/movie/favorites">
              Favorites
            </Link>
          </Flex>
          <ColorModeSwitcher />
        </Flex>
      </Grid>
      <Divider />
      {children}
    </Container>
  );
};

export default MainLayout;
