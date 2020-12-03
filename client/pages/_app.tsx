import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {Auth0Provider, useAuth0} from '@auth0/auth0-react';
import {ChakraProvider, CSSReset} from '@chakra-ui/react';
import type {AppProps} from 'next/app';
import React, {useEffect, useState} from 'react';
import Layout from '../components/layout';

const Inner: React.FC<any> = ({Component, pageProps}) => {
  /* makes sure the auth state is checked before loading the app */
  const [authLoading, setAuthLoading] = useState(true);
  const {isAuthenticated, getAccessTokenSilently, isLoading} = useAuth0();

  useEffect(() => {
    if (!isLoading) {
      setAuthLoading(isLoading);
    }
  }, [isLoading]);
  /* end */

  /* creates the apollo client and assigns the auth token to the header if it exists */
  const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql',
  });

  const authLink = setContext(async (_, {headers}) => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently({
        audience: `https://investory-server.herokuapp.com/`,
      });

      console.log(token);

      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    } else {
      return {headers};
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  /* end */

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <CSSReset />
        <Layout>{authLoading ? null : <Component {...pageProps} />}</Layout>
      </ChakraProvider>
    </ApolloProvider>
  );
};

// This wrapper is required because the auth logic can only be made
// in a component wrapped with Auth0Provider
const MyApp: React.FC<AppProps> = ({Component, pageProps}: AppProps) => {
  return (
    <Auth0Provider
      domain="investory.eu.auth0.com"
      clientId="BnCEdfeUBI7sohvRpdygByQ0RSFJZBO4"
      redirectUri="http://localhost:3000"
      audience="https://investory-server.herokuapp.com/"
      useRefreshTokens={true}
    >
      <Inner Component={Component} pageProps={pageProps} />
    </Auth0Provider>
  );
};

export default MyApp;
