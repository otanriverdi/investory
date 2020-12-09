import {CheckIcon, CloseIcon, Search2Icon} from '@chakra-ui/icons';
import {
  Box,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
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
  Skeleton,
  Stack,
  useColorMode,
  useToast,
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

type InputProps = {
  label: string;
};

const MyDatePicker = chakra(DatePicker);

const FormInput: React.FC<InputProps> = ({children, label}) => (
  <Flex direction="column" justify="space-between">
    <FormLabel fontWeight="bold" ml={1}>
      {label}
    </FormLabel>
    {children}
  </Flex>
);

type FormProps = {
  onComplete?: () => unknown;
};

const Form: React.FC<FormProps> = ({
  onComplete = () => {
    return;
  },
}) => {
  const [price, setPrice] = useState('0');
  const [amount, setAmount] = useState('0');
  const [symbol, setSymbol] = useState('');
  const [posDate, setPosDate] = useState(new Date());
  const [posType, setPosType] = useState<PositionType>(PositionType.Buy);
  const [getInstruments, {data, loading}] = useGetInstrumentsLazyQuery();
  const [createPosition] = useCreatePositionMutation();

  const toast = useToast();
  const {colorMode} = useColorMode();

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
          amount: +amount,
          price: +price,
          symbol,
          date: posDate,
          type: posType,
        },
      },
      refetchQueries: ['getPositions'],
    });

    toast({
      title: 'Success!',
      description: 'We created your position.',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top',
    });

    setSymbol('');
    setPrice('0');
    setAmount('0');

    onComplete();
  }

  function handleSymbolSelect(instrument: Instrument) {
    setSymbol(instrument.symbol);
    setPrice(instrument.price ? instrument.price.current.toString() : '0');
  }

  return (
    <Box p={4} px={12}>
      <FormControl>
        <Flex justify="space-between" align="center">
          <FormInput label="Symbol">
            <Box position="relative">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Search2Icon color="cyan.500" />
                </InputLeftElement>
                <Input
                  placeholder="Symbol"
                  autoComplete="off"
                  onChange={e => {
                    if (e.target.value.length === 0) {
                      setPrice('0');
                    }

                    setSymbol(e.target.value);
                  }}
                  value={symbol}
                />
              </InputGroup>
              <Box
                overflow="auto"
                zIndex={2}
                backgroundColor={colorMode === 'light' ? 'white' : 'gray.500'}
                borderRadius="md"
                borderWidth="1px"
                hidden={symbol.length < 2 || +price > 0}
                position="absolute"
                width="100%"
                h={100}
              >
                {loading && <Skeleton height="100%" />}
                {data &&
                  data.getInstruments.map(instrument => (
                    <Box
                      key={instrument.symbol}
                      pl={4}
                      pr={2}
                      onClick={() => handleSymbolSelect(instrument)}
                      _hover={{
                        background: 'cyan.500',
                        color: 'black',
                      }}
                    >
                      {instrument.symbol}
                    </Box>
                  ))}
              </Box>
            </Box>
          </FormInput>

          <FormInput label="Price ($)">
            <NumberInput
              defaultValue={15}
              precision={2}
              value={price}
              onChange={num => setPrice(num)}
            >
              <NumberInputField />
            </NumberInput>
          </FormInput>

          <FormInput label="Quantity">
            <NumberInput
              inputMode="decimal"
              precision={8}
              step={1}
              value={amount}
              onChange={num => setAmount(num)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormInput>

          <FormInput label="Opening Date">
            <Box borderRadius="md" borderWidth="1px" h={41} p={2}>
              <MyDatePicker
                zIndex="5"
                background="inherit"
                outLineStyle="none"
                selected={posDate}
                onChange={date => setPosDate(date)}
              />
            </Box>
          </FormInput>

          <FormInput label="Type">
            <RadioGroup
              value={posType}
              defaultValue={PositionType.Buy}
              borderWidth="1px"
              p={2}
              borderRadius="md"
              onChange={type => setPosType(type as PositionType)}
            >
              <Stack direction="row">
                <Radio value={PositionType.Buy}>Buy</Radio>
                <Radio value={PositionType.Sell}>Sell</Radio>
              </Stack>
            </RadioGroup>
          </FormInput>
        </Flex>

        <Flex mt={4} mb={2} justify="flex-end">
          <IconButton
            aria-label="save position"
            bg="red.300"
            icon={<CloseIcon />}
            onClick={onComplete}
            mr={2}
            size="sm"
            color="white"
          />
          <IconButton
            aria-label="cancel position"
            bg="cyan.500"
            icon={<CheckIcon />}
            onClick={handleSubmit}
            color="white"
            size="sm"
            disabled={
              symbol.length < 3 || Number(price) <= 0 || Number(amount) <= 0
            }
          />
        </Flex>
      </FormControl>
    </Box>
  );
};

export default Form;
