import {ChevronDownIcon, SettingsIcon} from '@chakra-ui/icons';
import {Menu, MenuButton, MenuList, MenuItem, Button} from '@chakra-ui/react';
import React from 'react';

const Edit: React.FC = () => (
  <Menu>
    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
      <SettingsIcon />
    </MenuButton>
    <MenuList>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Close</MenuItem>
      <MenuItem>Delete</MenuItem>
    </MenuList>
  </Menu>
);

export default Edit;
