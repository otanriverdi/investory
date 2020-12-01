import {Box, Flex} from '@chakra-ui/react';
import React from 'react';

const Header: React.FC = () => {
  return (
    <Flex justify="space-between">
      <Box>Ticker</Box>
      <Box>Company</Box>
      <Box>Last Price</Box>
      <Box>Price Open</Box>
      <Box>Open Date</Box>
      <Box>Invested($)</Box>
      <Box>Value</Box>
      <Box>P/L($)</Box>
      <Box>P/L(%)</Box>
    </Flex>
  );
};

export default Header;
