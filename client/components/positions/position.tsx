import {
  Badge,
  Box,
  Divider,
  Link,
  SimpleGrid,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, {useMemo} from 'react';
import {
  Position,
  PositionState,
  PositionType,
} from '../../graphql/generated/graphql';
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

    if (position.state === PositionState.Closed) {
      return 0;
    }

    let c =
      position.amount * position.instrument.price.current -
      position.amount * position.price;

    if (position.type === PositionType.Sell) {
      c = -c;
    }

    const fixed = c.toFixed(2);

    if (fixed.split('.')[1] !== '00') {
      c = Number(fixed);
    } else {
      c = Math.round(c);
    }

    return c;
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
    return (change * 100) / position.price;
  }, [position]);

  return (
    <Box textAlign="center">
      <Divider mt={3} mb={3} />
      <SimpleGrid alignItems="center" columns={11}>
        {position.instrument.type === 'stock' ? (
          <Link
            href={`/instruments/${position.instrument.symbol}/1m`}
            color="cyan.500"
            fontWeight="bold"
            _focus={{outline: 'none'}}
          >
            {position.instrument.symbol}
          </Link>
        ) : (
          <Text color="gray.500" fontWeight="bold">
            {position.instrument.symbol}
          </Text>
        )}
        <Box>
          $
          {position.instrument.price
            ? position.instrument.price.current.toFixed(2)
            : 0}
        </Box>
        <Box>${position.price}</Box>
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
            top={-2}
            left={-35}
            label={dayjs(position.date).format('ddd, MMM D YYYY, h:ma')}
            aria-label="expanded date"
          >
            <Box>{dayjs(position.date).format("MMM D, 'YY")}</Box>
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
        <Box textAlign="center">
          <Edit id={position.id} open={position.state === PositionState.Open} />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default SinglePosition;
