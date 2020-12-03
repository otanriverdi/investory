import {Divider, Flex} from '@chakra-ui/react';
import React from 'react';
// import Form from './posTable/form';
import Header from './header';
import SinglePosition from './position';

type Props = {
  positions?: any[];
};

const Positions: React.FC<Props> = ({positions = []}) => {
  return (
    <Flex direction="column">
      <Header />
      <Divider mt={3} mb={3} />
      {positions.map(position => (
        <SinglePosition position={position} key={position.id} />
      ))}
      {/* <Form /> */}
    </Flex>
  );
};

export default Positions;
