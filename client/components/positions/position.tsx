import {
  Box,
  Divider,
  Link,
  SimpleGrid,
  Tooltip,
  Badge,
  Flex,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, {useMemo} from 'react';
import {Position, PositionState} from '../../graphql/generated/graphql';
import TrendLine from '../trendline';
import Edit from './edit';

type Props = {
  position: Position;
};

const SinglePosition: React.FC<Props> = ({position}) => {
  const change = useMemo(() => {
    if (!position.instrument.price) {
      return 0;
    }

    return (
      position.amount * position.instrument.price.current -
      position.amount * position.price
    );
  }, [position]);

  const currentBalance = useMemo(
    () =>
      position.amount *
      (position.instrument.price
        ? position.instrument.price.current
        : position.price),
    [position],
  );

  const percentage = useMemo(() => {
    return (currentBalance * 100) / (position.amount * position.price) - 100;
  }, [position]);

  return (
    <Box>
      <Divider mt={3} mb={3} />
      <SimpleGrid columns={11}>
        <Link
          href={`/instruments/${position.instrument.symbol}/1m`}
          color="cyan.500"
          fontWeight="bold"
          _focus={{outline: 'none'}}
        >
          {position.instrument.symbol}
        </Link>
        <Box>
          {position.instrument.price
            ? position.instrument.price.current.toFixed(2)
            : 0}
        </Box>
        <Box>{position.price}</Box>
        <Box ml={1}>
          <Badge
            position="relative"
            bottom={0.5}
            mr={2}
            colorScheme={position.type === 'BUY' ? 'green' : 'red'}
          >
            {position.type}
          </Badge>
          {position.amount}
        </Box>
        <Box position="relative">
          <Tooltip
            position="absolute"
            top={-5}
            left={-55}
            label={dayjs(position.date).format('ddd, MMM D YYYY, h:ma')}
            aria-label="A tooltip"
          >
            <Box h={10}>{dayjs(position.date).format('DD-MM-YY')}</Box>
          </Tooltip>
        </Box>
        <Box>${(position.price * position.amount).toFixed(2)}</Box>
        <Box>${currentBalance.toFixed(2)}</Box>
        <Box textColor={change >= 0 ? 'green.400' : 'red.600'}>
          ${change.toFixed(2)}
        </Box>
        <Box textColor={change >= 0 ? 'green.400' : 'red.600'}>
          {percentage.toFixed(2)}%
        </Box>
        <Box w={100} h={10}>
          <TrendLine position={position} />
        </Box>
        <Edit id={position.id} open={position.state === PositionState.Open} />
      </SimpleGrid>
    </Box>
  );
};

export default SinglePosition;
