import {AddIcon, CloseIcon} from '@chakra-ui/icons';
import {
  Button,
  chakra,
  Collapse,
  Divider,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {PositionState} from '../../graphql/generated/graphql';
import Form from '../positions/form';
import Header from './header';
import SinglePosition from './position';

type Props = {
  positions?: any[];
};

const MyCollapse = chakra(Collapse);

const Positions: React.FC<Props> = ({positions = []}) => {
  const {isOpen, onToggle} = useDisclosure();

  return (
    <>
      <Divider my={4} />
      <MyCollapse overflow="visible !important" in={isOpen} animateOpacity>
        <Form onComplete={onToggle} />
      </MyCollapse>
      <Tabs
        mt={5}
        variant="soft-rounded"
        colorScheme="cyan"
        borderRadius="md"
        borderWidth="1px"
        p={4}
      >
        <TabList>
          <Tab>Open</Tab>
          <Tab>Closed</Tab>
          <Tooltip label="Add a new position" aria-label="Add a new position">
            <Button onClick={onToggle} ml={2} bg="cyan.300" color="white">
              {isOpen ? <CloseIcon /> : <AddIcon />}
            </Button>
          </Tooltip>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex direction="column">
              <Header />
              {positions
                .filter(p => p.state === PositionState.Open)
                .map(position => (
                  <SinglePosition position={position} key={position.id} />
                ))}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction="column">
              <Header />
              {positions
                .filter(p => p.state === PositionState.Closed)
                .map(position => (
                  <SinglePosition position={position} key={position.id} />
                ))}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Positions;
