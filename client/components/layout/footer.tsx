import {Box, Text} from '@chakra-ui/react';
import React from 'react';

const Footer: React.FC = () => (
  <footer>
    <Box py={6} textAlign="center">
      <Text fontWeight="500" fontSize="md">
        Made with ♥️ by Arindam Aluni, Jack Doyle and Özgür Tanrıverdi
      </Text>
    </Box>
  </footer>
);

export default Footer;
