import {Heading, Skeleton} from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
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

  if (error) {
    return null;
  }

  if (loading) return <Skeleton height="100%" />;

  const graphProp = {
    title: position.instrument.name,
    labels:
      data &&
      data.getInstrumentHistory.map(i => dayjs(i.date).format('DD MMM YY')),
    dataSets: [
      {
        label: position.instrument.symbol,
        data: data && data.getInstrumentHistory.map(i => i.close),
      },
    ],
    width: 100,
    height: 0,
  };

  return <LineChart {...graphProp} />;
};

export default TrendLine;
