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
import React from 'react';
import Layout from '../components/layout';

const Inner: React.FC<any> = ({Component, pageProps}) => {
  const {isAuthenticated, getAccessTokenSilently} = useAuth0();

  const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql',
  });

  // sets the auth header if user is logged in
  const authLink = setContext(async (_, {headers}) => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently({
        audience: `https://investory-server.herokuapp.com/`,
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

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <CSSReset />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  );
};

const MyApp: React.FC<AppProps> = ({Component, pageProps}: AppProps) => {
  return (
    <Auth0Provider
      domain="investory.eu.auth0.com"
      clientId="BnCEdfeUBI7sohvRpdygByQ0RSFJZBO4"
      redirectUri="http://localhost:3000"
      audience="https://investory-server.herokuapp.com/"
    >
      <Inner Component={Component} pageProps={pageProps} />
    </Auth0Provider>
  );
};

export default MyApp;
