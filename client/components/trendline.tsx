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

  if (error)
    console.warn('Unable to fetch instrument history with error: ', error);

  if (loading) return <Skeleton />;

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
    width: 100,
    height: 0,
  };

  return <LineChart {...graphProp} />;
};

export default TrendLine;
