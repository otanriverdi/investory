import {Box, SimpleGrid} from '@chakra-ui/react';
import React from 'react';

const Header: React.FC = () => {
  return (
    <SimpleGrid columns={11}>
      <Box fontWeight="bold">Ticker</Box>
      <Box fontWeight="bold">Last Price</Box>
      <Box fontWeight="bold">Price Open</Box>
      <Box fontWeight="bold">Quantity</Box>
      <Box fontWeight="bold">Open Date</Box>
      <Box fontWeight="bold">Invested($)</Box>
      <Box fontWeight="bold">Value</Box>
      <Box fontWeight="bold">P/L($)</Box>
      <Box fontWeight="bold">P/L(%)</Box>
    </SimpleGrid>
  );
};

export default Header;
