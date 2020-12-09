import {
  Box,
  Divider,
  Flex,
  HStack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import {useGetInstrumentsQuery} from '../graphql/generated/graphql';

type InstrumentSummaryProps = {
  symbol: string;
};

const InstrumentSummary: React.FC<InstrumentSummaryProps> = props => {
  const {symbol} = props;
  const {data, loading, error} = useGetInstrumentsQuery({
    variables: {
      query: symbol,
    },
  });

  if (error)
    console.warn('Unable to fetch instruments query with error: ', error);

  if (loading) return <Skeleton />;

  function renderStat(
    label: string,
    number: number,
    type: string,
    textHighlight = false,
    helpText: string = null,
  ) {
    return (
      stat && (
        <>
          <HStack align="flex-end" m={2} spacing={2} flex={1}>
            <Stat
              _hover={{transform: 'translateY(-3px)', borderColor: 'cyan.300'}}
              borderWidth="1px"
              borderRadius="md"
              px={4}
              py={2}
            >
              <StatLabel fontSize="l" fontWeight="bold">
                {label}
              </StatLabel>
              <StatNumber
                textColor={
                  textHighlight
                    ? number >= 0
                      ? 'green.400'
                      : 'red.600'
                    : 'cyan.600'
                }
                fontSize="xl"
              >
                {(type === 'currency' ? '$ ' : '') +
                  number +
                  (type === 'pcnt' ? '%' : '') +
                  ' '}
                {!helpText && (
                  <StatArrow type={number >= 0 ? 'increase' : 'decrease'} />
                )}
              </StatNumber>
              {helpText && (
                <StatHelpText fontSize="sm">{helpText}</StatHelpText>
              )}
            </Stat>
          </HStack>
        </>
      )
    );
  }

  let stat = null;
  let changeAmount = 0,
    chagePercent = 0;
  if (data?.getInstruments.length && data.getInstruments[0].symbol === symbol) {
    stat = data.getInstruments[0];
    changeAmount = +(stat.price.current - stat.price.previous).toFixed(2);
    chagePercent = +((changeAmount / stat.price.previous) * 100).toFixed(2);
  }

  return (
    <Box>
      <Text mb={2} fontWeight="400" fontSize="4xl">
        {stat.name} ({stat.symbol})
      </Text>
      {stat && (
        <Flex direction="row">
          {renderStat(
            'Current',
            stat.price.current,
            'currency',
            false,
            'Current market price',
          )}
          {renderStat(
            'Previous',
            stat.price.previous,
            'currency',
            false,
            'Last closing price',
          )}
          {renderStat('Absolute Change', changeAmount, 'currency', true)}
          {renderStat('Percent Change', chagePercent, 'pcnt', true)}
        </Flex>
      )}
      <Divider my={2} />
    </Box>
  );
};

export default InstrumentSummary;
