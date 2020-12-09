import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {Auth0Provider, useAuth0} from '@auth0/auth0-react';
import {Box, ChakraProvider, CSSReset, Flex, Spinner} from '@chakra-ui/react';
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
    uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  });

  const authLink = setContext(async (_, {headers}) => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently({
        audience: process.env.NEXT_PUBLIC_AUTH_AUDIENCE,
      });

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
        <Layout>
          {authLoading ? (
            <Flex height={200} align="center" justify="center">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  );
};

// This wrapper is required because the auth logic can only be made
// in a component wrapped with Auth0Provider
const MyApp: React.FC<AppProps> = ({Component, pageProps}: AppProps) => {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH_ID}
      redirectUri={process.env.NEXT_PUBLIC_AUTH_REDIRECT}
      audience={process.env.NEXT_PUBLIC_AUTH_AUDIENCE}
      useRefreshTokens={true}
    >
      <Inner Component={Component} pageProps={pageProps} />
    </Auth0Provider>
  );
};

export default MyApp;
