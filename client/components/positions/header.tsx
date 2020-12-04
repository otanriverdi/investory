import {Box, SimpleGrid} from '@chakra-ui/react';
import React from 'react';

const Header: React.FC = () => {
  return (
    <SimpleGrid columns={13}>
      <Box>Ticker</Box>
      <Box>Last Price</Box>
      <Box>Price Open</Box>
      <Box>Quantity</Box>
      <Box>Open Date</Box>
      <Box>Invested($)</Box>
      <Box>Value</Box>
      <Box>P/L($)</Box>
      <Box>P/L(%)</Box>
    </SimpleGrid>
  );
};

export default Header;
