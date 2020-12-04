import {Box, Divider, Flex} from '@chakra-ui/react';
import React from 'react';
// import Form from './posTable/form';
import Header from './header';
import SinglePosition from './position';
import StockPosition from './stock-position';

type Props = {
  positions?: any[];
};

const Positions: React.FC<Props> = ({positions = []}) => {
  return (
    <Flex borderRadius="md" borderWidth="1px" p={2} direction="column">
      <Header />
      <Divider mt={3} mb={3} />
      {positions.map(position =>
        position.instrument.type === 'stock' ? (
          <StockPosition position={position} key={position.id} />
        ) : (
          <Flex direction="row">
            <SinglePosition position={position} key={position.id} />
            <Box>No data found!</Box>
          </Flex>
        ),
      )}
      {/* <Form /> */}
    </Flex>
  );
};

export default Positions;
