import {Divider, Flex} from '@chakra-ui/react';
import React, {useState} from 'react';
// import Form from './posTable/form';
import Header from './posTable/header';
import Position from './posTable/position';

type Props = {
  positions?: any[];
};

const Positions: React.FC<Props> = ({positions}) => {
  return (
    <Flex direction="column">
      <Header />
      <Divider mt={3} mb={3} />
      {positions.map(position => (
        <Position position={position} key={position.id} />
      ))}
      {/* <Form /> */}
    </Flex>
  );
};

export default Positions;
