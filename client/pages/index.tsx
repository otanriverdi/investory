import {useAuth0} from '@auth0/auth0-react';
import {Skeleton} from '@chakra-ui/react';
import React from 'react';
import Summary from '../components/summary';

const Home: React.FC = () => {
  const {isAuthenticated, isLoading, user} = useAuth0();

  function renderHome() {
    return isAuthenticated ? (
      <Summary name={user.name} />
    ) : (
      <p>Log in to see your dashboard.</p>
    );
  }

  function renderLoading() {
    return (
      <Skeleton>
        <Summary />
      </Skeleton>
    );
  }

  return isLoading ? renderLoading() : renderHome();
};

export default Home;
