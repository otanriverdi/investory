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
  Text,
  Box,
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

  const open = positions.filter(p => p.state === PositionState.Open);
  const closed = positions.filter(p => p.state === PositionState.Closed);

  return (
    <>
      <Divider my={2} />
      <Box borderWidth="1px" borderRadius="md">
        <Text fontWeight="700" size="lg" p={4}>
          My Positions
        </Text>

        <MyCollapse overflow="visible !important" in={isOpen} animateOpacity>
          <Form onComplete={onToggle} />
        </MyCollapse>
        <Tabs variant="enclosed" colorScheme="cyan" borderTopWidth="1px" p={4}>
          <TabList mx={8}>
            <Tab _focus={{outline: 'none'}} disabled={!positions.length}>
              Open
            </Tab>
            <Tab _focus={{outline: 'none'}} disabled={!positions.length}>
              Closed
            </Tab>
            <Tooltip label="Add a new position" aria-label="Add a new position">
              <Button
                size="sm"
                onClick={onToggle}
                ml="auto"
                mr="17.75px"
                bg="cyan.500"
                color="white"
              >
                {isOpen ? <CloseIcon /> : <AddIcon />}
              </Button>
            </Tooltip>
          </TabList>
          <TabPanels>
            <TabPanel>
              {open.length ? (
                <Flex direction="column">
                  <Header />
                  {open.map(position => (
                    <SinglePosition position={position} key={position.id} />
                  ))}
                </Flex>
              ) : (
                <Text my={4} textAlign="center" fontWeight="bold">
                  You don&apos;t have any open positions yet. Add some to get
                  started!
                </Text>
              )}
            </TabPanel>
            <TabPanel>
              {closed.length ? (
                <Flex direction="column">
                  <Header />
                  {closed.map(position => (
                    <SinglePosition position={position} key={position.id} />
                  ))}
                </Flex>
              ) : (
                <Text my={4} textAlign="center" fontWeight="bold">
                  You don&apos;t have any closed positions.
                </Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default Positions;
