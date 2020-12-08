import {Heading, Skeleton} from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import {
  Position,
  useGetInstrumentHistoryQuery,
} from '../graphql/generated/graphql';
import LineChart from './charts/line-chart';

type Props = {
  position: Position;
};

const TrendLine: React.FC<Props> = ({position}) => {
  const symbol = position.instrument.symbol;
  const {loading, error, data} = useGetInstrumentHistoryQuery({
    variables: {
      symbol: symbol,
      duration: '1m',
    },
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
    date.push(dayjs(item.date).format('DD MMM YYYY'));
  });

  const graphProp = {
    title: 'Stock history in time',
    labels: date,
    dataSets: [
      {
        label: 'Stocks',
        data: close,
      },
    ],
    width: 100,
    height: 0,
  };

  return <LineChart {...graphProp} />;
};

export default TrendLine;
