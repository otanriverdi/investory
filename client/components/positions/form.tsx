import {CheckIcon} from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FormControl,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Menu,
  MenuItem,
  MenuList,
  Box,
} from '@chakra-ui/react';
import React, {useState, useEffect} from 'react';
import {
  useCreatePositionMutation,
  useGetInstrumentsLazyQuery,
} from '../../graphql/generated/graphql';

const Form: React.FC = () => {
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [symbol, setSymbol] = useState('');
  // const [queryList, setQueryList] = useState([]);
  const [getInstruments, {loading, error, data}] = useGetInstrumentsLazyQuery();
  const [createPosition] = useCreatePositionMutation();
  const mockData = [
    {
      id: 1565,
      name: 'Amg Bank',
      price: {
        current: 150,
        previous: 153,
      },
      symbol: 'AMAL',
      type: 'stock',
    },
    {
      id: 1566,
      name: 'App Mat',
      price: {
        current: 69,
        previous: 67,
      },
      symbol: 'AMAT',
      type: 'stock',
    },
  ];

  useEffect(() => {
    if (symbol.length > 1) {
      getInstruments({
        variables: {
          query: symbol,
        },
      });
    }
    console.log('data', data);
    console.log(symbol);
  }, [symbol]);

  async function handleSubmit() {
    await createPosition({
      variables: {
        fields: {
          amount,
          price,
          symbol,
        },
      },
      refetchQueries: ['getPositions'],
    });
    setSymbol('');
    setPrice(0);
    setAmount(0);
  }

  return (
    <FormControl>
      <Flex mb={2} justify="space-between">
        <Flex direction="column" justify="space-between">
          <Text>Symbol</Text>
          <Input
            placeholder="Symbol"
            onChange={e => setSymbol(e.target.value)}
            value={symbol}
            width="200px"
          />
        </Flex>
        <Flex direction="column">
          <Text>Price</Text>
          <NumberInput
            defaultValue={15}
            precision={2}
            step={0.2}
            value={price}
            onChange={(_, num) => setPrice(num)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
        <Flex direction="column">
          <Text>Quantity</Text>
          <NumberInput
            defaultValue={200}
            step={10}
            value={amount}
            onChange={(_, num) => setAmount(num)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
        <Flex direction="column-reverse">
          <Button
            leftIcon={<CheckIcon />}
            variant="solid"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  );
};

export default Form;
