import {ChevronDownIcon, EditIcon} from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import {
  useClosePositionMutation,
  useDeletePositionMutation,
} from '../../graphql/generated/graphql';

type Props = {
  id: number;
  open: boolean;
};

const Edit: React.FC<Props> = ({id, open}) => {
  const [close] = useClosePositionMutation();
  const [deletePosition] = useDeletePositionMutation();
  const toast = useToast();

  async function onClose() {
    await close({variables: {id}, refetchQueries: ['getPositions']});

    toast({
      title: 'Close Successful',
      description: 'We closed your position for you.',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top',
    });
  }

  async function onDelete() {
    await deletePosition({variables: {id}, refetchQueries: ['getPositions']});

    toast({
      title: 'Deletion Successful',
      description: 'We deleted your position for you.',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top',
    });
  }

  return (
    <Menu>
      <MenuButton size="sm" as={Button}>
        <EditIcon />
      </MenuButton>
      <MenuList>
        <MenuItem>Edit</MenuItem>
        {open && <MenuItem onClick={onClose}>Close</MenuItem>}
        <MenuItem onClick={onDelete}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Edit;
