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
  FormLabel,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Box,
  Divider,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  PositionType,
  useCreatePositionMutation,
  useGetInstrumentsLazyQuery,
} from '../../graphql/generated/graphql';

const Form: React.FC = () => {
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [symbol, setSymbol] = useState('');
  const [posDate, setPosDate] = useState(new Date());
  const [posType, setPosType] = useState('');
  const [getInstruments, {loading, error, data}] = useGetInstrumentsLazyQuery();
  const [createPosition] = useCreatePositionMutation();

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
          date: posDate,
        },
      },
      refetchQueries: ['getPositions'],
    });
    setSymbol('');
    setPrice(0);
    setAmount(0);
  }

  // function handleMenu() {
  //   setSymbol(instrument.symbol)
  //   setPrice(instrument.price.current)
  // }

  return (
    <FormControl>
      <Flex mb={2} justify="space-between" wrap="wrap" align="center">
        <Flex direction="column" justify="space-between">
          <FormLabel>Symbol</FormLabel>
          <Input
            placeholder="Symbol"
            onChange={e => setSymbol(e.target.value)}
            value={symbol}
            width="200px"
          />
          <Box borderRadius="md" borderWidth="1px">
            {data &&
              data.getInstruments.map(instrument => (
                <Box
                  key={instrument.id}
                  // TODO: need onClick={handleMenu()} to handle setting symbol and price
                  _hover={{
                    transform: 'translateY(-3px)',
                    background: 'rgb(226,232,240)',
                  }}
                >
                  {instrument.symbol}
                </Box>
              ))}
          </Box>
        </Flex>

        <Flex direction="column" justify="space-between">
          <FormLabel>Price</FormLabel>
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
          <Box>
            <DatePicker
              selected={posDate}
              onChange={date => setPosDate(date)}
            />
          </Box>
        </Flex>
        <Flex direction="column">
          <FormLabel>Quantity</FormLabel>
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
          {/* // TODO: need to handle position type */}
          <RadioGroup value={posType} defaultValue={PositionType.Buy}>
            <Stack direction="row">
              <Radio value="Buy">Buy</Radio>
              <Radio value="Sell">Sell</Radio>
            </Stack>
          </RadioGroup>
          <Button
            leftIcon={<CheckIcon />}
            variant="solid"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Flex>
      </Flex>
      <Divider mt={3} mb={3} />
    </FormControl>
  );
};

export default Form;
