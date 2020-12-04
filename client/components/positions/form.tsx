import {CheckIcon} from '@chakra-ui/icons';
import {
  Flex,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  FormControl,
} from '@chakra-ui/react';
import React, {useState, useEffect} from 'react';
import {
  useGetInstrumentsLazyQuery,
  useCreatePositionMutation,
} from '../../graphql/generated/graphql';

const Form: React.FC = () => {
  const [price, setPrice] = useState(0);
  const [invested, setInvested] = useState(0);
  const [query, setQuery] = useState('');
  const [
    getInstruments,
    {loading: insLoading, error: insError, data: insData},
  ] = useGetInstrumentsLazyQuery();
  const [
    createPosition,
    {loading: posLoading, error: posError, data: posData},
  ] = useCreatePositionMutation();

  useEffect(() => {
    if (query.length > 2) {
      getInstruments({
        variables: {
          query: query,
        },
      });
    }
  }, [query]);

  function handleQuery(e) {
    setQuery(e.target.value);
  }

  function handlePriceChange(value) {
    setPrice(value);
  }

  function handleInvestedChange(value) {
    setInvested(value);
  }

  async function handleSubmit() {
    console.log(invested);
    console.log(price);
    console.log(query);
    await createPosition({
      variables: {
        fields: {
          amount: invested,
          price: price,
          symbol: query,
        },
      },
      refetchQueries: ['getPositions'],
    });
    setQuery('');
    setPrice(0);
    setInvested(0);
  }

  return (
    <FormControl>
      <Flex mb={2} justify="space-between">
        <Input
          placeholder="Search a ticker"
          onChange={handleQuery}
          value={query}
          width="200px"
        />
        <NumberInput
          defaultValue={15}
          precision={2}
          step={0.2}
          value={price}
          onChange={handlePriceChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <NumberInput
          defaultValue={200}
          step={10}
          value={invested}
          onChange={handleInvestedChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button leftIcon={<CheckIcon />} variant="solid" onClick={handleSubmit}>
          Save
        </Button>
      </Flex>
    </FormControl>
  );
};

export default Form;
