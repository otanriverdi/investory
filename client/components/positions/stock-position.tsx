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

/*
    const x = [0.9, 0.9, 0.95, 0.99, 0.8, 0.8, 0.9947, 1.09, 1.23, 1.99, 1.63, 1.74, 1.91, 1.8, 1.78, 1.75, 1.826, 2.1, 2.07, 2.01, 2];
    const t = [
      dayjs("2020-11-03T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-04T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-05T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-06T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-09T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-10T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-11T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-12T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-13T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-16T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-17T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-18T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-19T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-20T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-23T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-24T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-25T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-27T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-11-30T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-12-01T00:00:00.000Z").format('DD MMM YYYY'),
      dayjs("2020-12-02T00:00:00.000Z").format('DD MMM YYYY')
    ]

    const history = () => {
      if (position.instrument.type === 'stock') {
        const result = {
          title: 'Stock history in time',
          labels: t,
          dataSets: [
            {
              label: 'Stocks',
              data: x,
            }
          ],
          height: 86,
        };

        return result;
      }

      return null;
    } */
