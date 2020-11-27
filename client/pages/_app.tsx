import {ChakraProvider, CSSReset} from '@chakra-ui/react';
import type {AppProps} from 'next/app';
import React from 'react';

const MyApp: React.FC<AppProps> = ({Component, pageProps}: AppProps) => {
  return (
    <ChakraProvider>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
