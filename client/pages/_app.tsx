import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {Auth0Provider} from '@auth0/auth0-react';
import {ChakraProvider, CSSReset} from '@chakra-ui/react';
import type {AppProps} from 'next/app';
import React from 'react';
import Layout from '../components/layout';

const MyApp: React.FC<AppProps> = ({Component, pageProps}: AppProps) => {
  const client = new ApolloClient({
    uri: 'http://localhost:8000/',
    cache: new InMemoryCache(),
  });

  return (
    <Auth0Provider
      domain="investory.eu.auth0.com"
      clientId="BnCEdfeUBI7sohvRpdygByQ0RSFJZBO4"
      redirectUri="http://localhost:3000"
    >
      <ApolloProvider client={client}>
        <ChakraProvider>
          <CSSReset />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ApolloProvider>
    </Auth0Provider>
  );
};

export default MyApp;
