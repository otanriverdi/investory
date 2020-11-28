import {useAuth0} from '@auth0/auth0-react';
import React from 'react';
import Summary from '../components/summary';

const Home: React.FC = () => {
  const {isAuthenticated, user} = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <Summary name={user.name} />
      ) : (
        <p>Log in to see your dashboard.</p>
      )}
    </>
  );
};

export default Home;
