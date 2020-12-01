import {Box, chakra, Container, Flex} from '@chakra-ui/react';
import React from 'react';
import Footer from './footer';
import Header from './header';
import Form from '../posTable/form';

type Props = {
  children: JSX.Element;
};

// The flex layout is to push the footer to the bottom of the page
const Layout: React.FC<Props> = ({children}) => {
  return (
    <Container px={4} maxW="xl">
      <Flex direction="column" minHeight="100vh">
        <chakra.div flex="1">
          <Header />
          <Box py={6}>{children}</Box>
        </chakra.div>
        <Footer />
      </Flex>
    </Container>
  );
};

export default Layout;
