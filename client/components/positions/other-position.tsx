import {Flex} from '@chakra-ui/react';
import React from 'react';
import {Position} from '../../graphql/generated/graphql';
import LineChart from '../charts/line-chart';
import SinglePosition from './position';

type Props = {
  position: Position;
};

const OtherPosition: React.FC<Props> = ({position}) => {
  // Since we don't have data for anything other than stocks
  // we will generate empty data in order to display the graph

  const xAxis = new Array(21).fill(0);
  const yAxis = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const graphProp = {
    title: position.instrument.name,
    labels: yAxis,
    dataSets: [
      {
        label: position.instrument.name,
        data: xAxis,
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

export default OtherPosition;
