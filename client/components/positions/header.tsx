import {Box, SimpleGrid} from '@chakra-ui/react';
import React from 'react';

const Header: React.FC = () => {
  return (
    <SimpleGrid mt={2} fontSize="md" columns={11} textAlign="center">
      <Box fontWeight="bold">Symbol</Box>
      <Box fontWeight="bold">Last Price</Box>
      <Box fontWeight="bold">Open Price</Box>
      <Box fontWeight="bold">Quantity</Box>
      <Box fontWeight="bold">Open Date</Box>
      <Box fontWeight="bold">Invested</Box>
      <Box fontWeight="bold">Value</Box>
      <Box fontWeight="bold">P/L($)</Box>
      <Box fontWeight="bold">P/L(%)</Box>
      <Box fontWeight="bold">Trend(1M)</Box>
      <Box fontWeight="bold">Edit</Box>
    </SimpleGrid>
  );
};

export default Header;
