import {useAuth0} from '@auth0/auth0-react';
import React from 'react';
import Summary from '../components/summary';
import Positions from '../components/positions';
import {Box} from '@chakra-ui/react';

const Home: React.FC = () => {
  const {isAuthenticated, user} = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <Box>
          <Summary name={user.name} />
          <Positions />
        </Box>
      ) : (
        <p>Log in to see your dashboard.</p>
      )}
    </>
  );
};

export default Home;
