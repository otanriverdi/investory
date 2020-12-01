import {useAuth0} from '@auth0/auth0-react';
import {Skeleton} from '@chakra-ui/react';
import React from 'react';
import Landing from '../components/landing';
import Summary from '../components/summary';
// import Positions from '../components/positions';
import useSummary from '../hooks/use-summary';

const Home: React.FC = () => {
  const {isAuthenticated, loginWithRedirect, user} = useAuth0();

  const {balance, daily, total, loading: summaryLoading} = useSummary();

  // each component should be wrapped with a skeleton with isLoaded set to their data loading state
  return isAuthenticated ? (
    <Skeleton isLoaded={!summaryLoading}>
      <Summary balance={balance} daily={daily} total={total} name={user.name} />
    </Skeleton>
  ) : (
    <Landing onAction={() => loginWithRedirect()} />
  );
};

export default Home;
