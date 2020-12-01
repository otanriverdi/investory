import {
  Box,
  Divider,
  HStack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  name?: string;
  balance?: number;
  daily?: {
    amount: number;
    percentage: number;
  };
  total?: {
    amount: number;
    percentage: number;
  };
};

const Summary: React.FC<Props> = ({
  name = '',
  balance = 53000,
  total = {amount: 1250, percentage: 12.5},
  daily = {amount: -25, percentage: 1.2},
}) => {
  function renderSubStat(
    title: string,
    data: {amount: number; percentage: number},
  ) {
    return (
      <Stat
        _hover={{transform: 'translateY(-3px)', borderColor: 'cyan.300'}}
        borderWidth="1px"
        borderRadius="md"
        px={4}
        py={2}
      >
        <StatLabel>{title}</StatLabel>
        <StatNumber textColor={data.amount >= 0 ? 'green.400' : 'red.600'}>
          €{Math.abs(data.amount)}
        </StatNumber>
        <StatHelpText>
          <StatArrow type={data.amount >= 0 ? 'increase' : 'decrease'} />%
          {data.percentage}
        </StatHelpText>
      </Stat>
    );
  }

  return (
    <Box>
      <Text mb={6} fontWeight="200" fontSize="4xl">
        Welcome{name && ' ' + name},
      </Text>
      <HStack align="flex-end" spacing={2}>
        <Stat
          _hover={{transform: 'translateY(-3px)', borderColor: 'cyan.300'}}
          borderWidth="1px"
          borderRadius="md"
          px={4}
          py={2}
        >
          <StatLabel fontSize="xl">Current Balance</StatLabel>
          <StatNumber fontSize="4xl">€{balance}</StatNumber>
          <StatHelpText>After Profit/Loss</StatHelpText>
        </Stat>
        {renderSubStat('Daily Change', daily)}
        {renderSubStat('Total Change', total)}
      </HStack>
      <Divider mt={6} mb={3} />
    </Box>
  );
};

export default Summary;
