import {
  Box,
  Divider,
  Flex,
  Collapse,
  Button,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
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
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Open</Tab>
        <Tab>Closed</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex borderRadius="md" borderWidth="1px" p={2} direction="column">
            <Header />
            <Divider mt={3} mb={3} />
            <Button onClick={onToggle} width="50px" alignSelf="center" mb={2}>
              <AddIcon />
            </Button>
            <Collapse in={isOpen} animateOpacity endingHeight={500}>
              <Box>
                <Form />
              </Box>
            </Collapse>

            {/* TODO: need to edit this so only shows the open positions*/}
            {positions.map(position =>
              position.instrument.type === 'stock' ? (
                <StockPosition position={position} key={position.id} />
              ) : (
                <OtherPosition position={position} key={position.id} />
              ),
            )}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex borderRadius="md" borderWidth="1px" p={2} direction="column">
            <Header />
            {/* TODO: need to edit this so only shows the closed positions*/}
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Positions;
