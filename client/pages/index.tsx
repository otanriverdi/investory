import {useAuth0} from '@auth0/auth0-react';
import {Skeleton} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import Landing from '../components/landing';
import Summary from '../components/summary';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const {isLoading, isAuthenticated, loginWithRedirect, user} = useAuth0();

  useEffect(() => {
    if (!isLoading) {
      setLoading(isLoading);
    }
  }, [isLoading]);

  if (loading) {
    return (
      <Skeleton>
        <Summary />
      </Skeleton>
    );
  }

  return isAuthenticated ? (
    <Summary name={user.name} />
  ) : (
    <Landing onAction={() => loginWithRedirect()} />
  );
};

export default Home;
