import {Box, Divider, SimpleGrid} from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, {useMemo} from 'react';
import {Position, PositionState} from '../../graphql/generated/graphql';
import Edit from './edit';

type Props = {
  position: Position;
};

const SinglePosition: React.FC<Props> = ({position}) => {
  const change = useMemo(() => {
    return (
      position.amount * position.instrument.price.current -
      position.amount * position.price
    );
  }, [position]);

  const currentBalance = useMemo(
    () => position.amount * position.instrument.price.current,
    [position],
  );

  const percentage = useMemo(() => {
    return (currentBalance * 100) / (position.amount * position.price);
  }, [position]);

  return (
    <Box>
      <SimpleGrid columns={11}>
        <Box>{position.instrument.symbol}</Box>
        <Box>{position.instrument.name}</Box>
        <Box>{position.instrument.price.current}</Box>
        <Box>{position.price}</Box>
        <Box>{position.amount}</Box>
        <Box>{dayjs(position.date).format('ddd, MMM D YY, h:ma')}</Box>
        <Box>${position.price * position.amount}</Box>
        <Box>${currentBalance}</Box>
        <Box textColor={change >= 0 ? 'green.400' : 'red.600'}>${change}</Box>
        <Box textColor={change >= 0 ? 'green.400' : 'red.600'}>
          {percentage.toFixed(2)}%
        </Box>
        <Edit id={position.id} open={position.state === PositionState.Open} />
      </SimpleGrid>
      <Divider mt={3} mb={3} />
    </Box>
  );
};

export default SinglePosition;
