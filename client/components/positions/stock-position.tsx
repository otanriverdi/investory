import {Flex, Heading, Skeleton} from '@chakra-ui/react';
import React from 'react';
import dayjs from 'dayjs';
import {
  Position,
  useGetInstrumentHistoryQuery,
} from '../../graphql/generated/graphql';
import LineChart from '../charts/line-chart';
import SinglePosition from './position';

type Props = {
  position: Position;
};

const StockPosition: React.FC<Props> = ({position}) => {
  const symbol = position.instrument.symbol;
  const {loading, error, data} = useGetInstrumentHistoryQuery({
    variables: {symbol},
  });

  if (loading)
    return (
      <Skeleton>
        <Heading>Loading...</Heading>
      </Skeleton>
    );
  if (error) return <p>Error</p>;

  const close = [];
  const date = [];
  data.getInstrumentHistory.forEach(item => {
    close.push(item.close);
    date.push(dayjs(item.date).format('DD MMM YY'));
  });

  const graphProp = {
    title: position.instrument.name,
    labels: date,
    dataSets: [
      {
        label: position.instrument.symbol,
        data: close,
      },
    ],
    height: 100,
  };

  return (
    <Flex direction="row">
      <SinglePosition position={position} />
      <LineChart {...graphProp} />
    </Flex>
  );
};

export default StockPosition;
