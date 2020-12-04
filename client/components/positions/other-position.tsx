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
    '01 Jan 2020',
    '01 Feb 2020',
    '01 Mar 2020',
    '01 Apr 2020',
    '01 May 2020',
    '01 Jun 2020',
    '01 Jul 2020',
    '01 Aug 2020',
    '01 Sep 2020',
    '01 Oct 2020',
    '01 Nov 2020',
    '01 Dec 2020',
  ];

  const instrumentName =
    position.instrument.type.charAt(0).toUpperCase() +
    position.instrument.type.slice(1);

  const graphProp = {
    title: instrumentName + ' history in time',
    labels: yAxis,
    dataSets: [
      {
        label: instrumentName,
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
