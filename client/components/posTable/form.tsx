import {ChevronDownIcon, SettingsIcon} from '@chakra-ui/icons';
import {
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import React from 'react';
import Search from './search';
import Edit from './edit';

const Form: React.FC = () => {
  return (
    <Flex justify="space-between">
      <Search />
      <NumberInput defaultValue={15} precision={2} step={0.2}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Edit />
    </Flex>
  );
};

export default Form;
