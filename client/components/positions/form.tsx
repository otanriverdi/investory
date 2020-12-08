import {CheckIcon, Search2Icon} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Instrument,
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
  const [selectionDisplay, setSelectionDisplay] = useState('none');
  const [getInstruments, {data}] = useGetInstrumentsLazyQuery();
  const [createPosition] = useCreatePositionMutation();

  useEffect(() => {
    if (symbol.length > 1) {
      getInstruments({
        variables: {
          query: symbol,
        },
      });
    }
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

  function handleSymbolSelect(instrument: Instrument) {
    setSymbol(instrument.symbol);
    setPrice(instrument.price.current);
    setSelectionDisplay('none');
  }

  return (
    <FormControl>
      <Flex
        overflow="visible"
        mb={2}
        justify="space-between"
        wrap="wrap"
        align="center"
      >
        <Flex overflow="visible" direction="column" justify="space-between">
          <FormLabel fontWeight="bold" pl={4}>
            Symbol
          </FormLabel>
          <Box overflow="visible" position="relative">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Search2Icon color="cyan.500" />
              </InputLeftElement>
              <Input
                placeholder="Symbol"
                onChange={e => {
                  setSymbol(e.target.value);
                  setSelectionDisplay('block');
                }}
                value={symbol}
                w={200}
              />
            </InputGroup>
            <Box
              overflow="visible"
              borderRadius="md"
              borderWidth="1px"
              display={selectionDisplay}
              position="absolute"
              w={200}
              h={200}
            >
              {data &&
                data.getInstruments.map(instrument => (
                  <Box
                    overflow="visible"
                    key={instrument.symbol}
                    pl={4}
                    pr={2}
                    // TODO: need onClick={handleMenu()} to handle setting symbol and price
                    onClick={e => handleSymbolSelect(instrument)}
                    _hover={{
                      transform: 'translateY(-3px)',
                      background: 'cyan.500',
                    }}
                  >
                    {instrument.symbol}
                  </Box>
                ))}
            </Box>
          </Box>
        </Flex>

        <Flex direction="column" justify="space-between">
          <FormLabel fontWeight="bold" pl={4}>
            Price
          </FormLabel>
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
        <Flex direction="column" justify="space-between">
          <FormLabel fontWeight="bold" pl={4}>
            Date
          </FormLabel>
          <Box borderRadius="md" borderWidth="1px" h={41} p={2}>
            <DatePicker
              outLineStyle="none"
              selected={posDate}
              onChange={date => setPosDate(date)}
            />
          </Box>
        </Flex>
        <Flex direction="column">
          <FormLabel fontWeight="bold" pl={4}>
            Quantity
          </FormLabel>
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
        <Flex direction="column">
          <FormLabel fontWeight="bold" pl={4}>
            Position
          </FormLabel>
          {/* // TODO: need to handle position type */}
          <RadioGroup
            value={posType}
            defaultValue={PositionType.Buy}
            borderWidth={1}
            p={2}
            borderRadius="md"
          >
            <Stack direction="row">
              <Radio value="Buy">Buy</Radio>
              <Radio value="Sell">Sell</Radio>
            </Stack>
          </RadioGroup>
        </Flex>
      </Flex>
      <Divider mt={3} mb={3} />
      <Flex justify="flex-end">
        <Button
          bg="cyan.500"
          leftIcon={<CheckIcon />}
          variant="solid"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Flex>
    </FormControl>
  );
};

export default Form;
