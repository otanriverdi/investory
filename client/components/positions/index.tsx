import {
  Box,
  Divider,
  Flex,
  Collapse,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {AddIcon} from '@chakra-ui/icons';
import Form from '../positions/form';
import Header from './header';
import OtherPosition from './other-position';
import StockPosition from './stock-position';

type Props = {
  positions?: any[];
};

const Positions: React.FC<Props> = ({positions = []}) => {
  const {isOpen, onToggle} = useDisclosure();

  return (
    <Flex borderRadius="md" borderWidth="1px" p={2} direction="column">
      <Header />
      <Divider mt={3} mb={3} />
      <Button
        onClick={onToggle}
        width="7
      50px"
        alignSelf="center"
        mb={2}
      >
        <AddIcon />
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Form />
        <Divider mt={3} mb={3} />
      </Collapse>
      {positions.map(position =>
        position.instrument.type === 'stock' ? (
          <StockPosition position={position} key={position.id} />
        ) : (
          <OtherPosition position={position} key={position.id} />
        ),
      )}
    </Flex>
  );
};

export default Positions;
