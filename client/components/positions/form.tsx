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
} from '@chakra-ui/react';
import React, {useState} from 'react';
import {useCreatePositionMutation} from '../../graphql/generated/graphql';

const Form: React.FC = () => {
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [symbol, setSymbol] = useState('');

  const [createPosition] = useCreatePositionMutation();

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
        <Input
          placeholder="Symbol"
          onChange={e => setSymbol(e.target.value)}
          value={symbol}
          width="200px"
        />
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
        <Button leftIcon={<CheckIcon />} variant="solid" onClick={handleSubmit}>
          Save
        </Button>
      </Flex>
    </FormControl>
  );
};

export default Form;
