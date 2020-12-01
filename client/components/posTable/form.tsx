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
import React, {useState} from 'react';

const Form: React.FC = () => {
  const [price, setPrice] = useState(0);
  const [invested, setInvested] = useState(0);
  const [query, setQuery] = useState('');

  function handleQuery(value) {
    setQuery(value);
  }
  function handlePriceChange(value) {
    setPrice(value);
  }
  function handleInvestedChange(value) {
    setInvested(value);
  }

  return (
    <FormControl>
      <Flex>
        <Input
          placeholder="Search a ticker"
          onChange={handleQuery}
          value={query}
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
        <Button leftIcon={<CheckIcon />} variant="solid" type="submit">
          Save
        </Button>
      </Flex>
    </FormControl>
  );
};

export default Form;
