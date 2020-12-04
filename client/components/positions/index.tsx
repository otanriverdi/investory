import {Divider, Flex, Box} from '@chakra-ui/react';
import React from 'react';
// import Form from './posTable/form';
import Header from './header';
import OtherPosition from './other-position';
import StockPosition from './stock-position';

type Props = {
  positions?: any[];
};

const Positions: React.FC<Props> = ({positions = []}) => {
  return (
    <Flex direction="column">
      <Header />
      <Divider mt={3} mb={3} />
      {positions.map(position =>
        position.instrument.type === 'stock' ? (
          <StockPosition position={position} key={position.id} />
        ) : (
          <OtherPosition position={position} key={position.id} />
        ),
      )}
      {/* <Form /> */}
    </Flex>
  );
};

export default Positions;
