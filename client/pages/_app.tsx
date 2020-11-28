import {ChakraProvider, CSSReset} from '@chakra-ui/react';
import type {AppProps} from 'next/app';
import React from 'react';
import Layout from '../components/layout';

const MyApp: React.FC<AppProps> = ({Component, pageProps}: AppProps) => {
  return (
    <ChakraProvider>
      <CSSReset />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default MyApp;
