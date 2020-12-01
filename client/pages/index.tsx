import {useAuth0} from '@auth0/auth0-react';
import {Skeleton} from '@chakra-ui/react';
import React from 'react';
import Landing from '../components/landing';
import Positions from '../components/positions';
import Summary from '../components/summary';
import {useGetPositionsQuery} from '../graphql/generated/graphql';
import useSummary from '../hooks/use-summary';

const Home: React.FC = () => {
  const {isAuthenticated, loginWithRedirect, user} = useAuth0();

  const {loading, data} = useGetPositionsQuery();

  const {balance, daily, total} = useSummary(data);

  // each component should be wrapped with a skeleton with isLoaded set to their data loading state
  return isAuthenticated ? (
    <>
      <Skeleton isLoaded={!loading}>
        <Summary
          balance={balance}
          daily={daily}
          total={total}
          name={user.name}
        />
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <Positions positions={data && data.getPositions} />
      </Skeleton>
    </>
  ) : (
    <Landing onAction={() => loginWithRedirect()} />
  );
};

export default Home;
