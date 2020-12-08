import {AddIcon} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
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
    <>
      <Box borderRadius="md" borderWidth="1px" p={4} mb={5}>
        <Flex alignItems="center" direction="column">
          <Button
            onClick={onToggle}
            w={50}
            h={50}
            borderRadius={50}
            alignSelf="center"
            mb={2}
            bg="cyan.500"
            color="white"
          >
            <AddIcon />
          </Button>
          {/* <Text display='inline-block' bg='red'>Add New Positions </Text> */}
        </Flex>
        <Collapse in={isOpen} animateOpacity endingHeight={325}>
          <Divider mb={2} />
          <Box>
            <Form />
          </Box>
        </Collapse>
      </Box>
      <Tabs
        variant="soft-rounded"
        colorScheme="cyan"
        borderRadius="md"
        borderWidth="1px"
        p={4}
      >
        <TabList>
          <Tab>Open</Tab>
          <Tab>Closed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex direction="column">
              <Header />
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
    </>
  );
};

export default Positions;
