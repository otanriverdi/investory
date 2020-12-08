import {DeleteIcon} from '@chakra-ui/icons';
import {Avatar, Box, Flex, Heading, IconButton, Text} from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import {Comment} from '../../graphql/generated/graphql';

type Props = {
  comment: {
    __typename?: 'Comment';
  } & Pick<
    Comment,
    'body' | 'id' | 'createdAt' | 'owner' | 'image' | 'username'
  >;
  onDelete: () => unknown;
  currentUser: string;
};

const SingleComment: React.FC<Props> = ({comment, onDelete, currentUser}) => {
  return (
    <Box
      _hover={{borderColor: 'cyan.300'}}
      mt={4}
      borderWidth="1px"
      borderRadius="md"
      p={4}
    >
      <Flex align="center" mb={2}>
        <Avatar
          mr={2}
          size="sm"
          src={comment.image}
          bgColor="gray.300"
          name={comment.username}
        />
        <Box>
          <Heading fontWeight="400" size="sm">
            {comment.username}
          </Heading>
          <Text color="gray.500" size="xs">
            {dayjs(comment.createdAt).fromNow()}
          </Text>
        </Box>
        {comment.owner === currentUser && (
          <IconButton
            onClick={onDelete}
            size="sm"
            _hover={{backgroundColor: 'red.300'}}
            isRound
            ml="auto"
            aria-label="delete comment"
            icon={<DeleteIcon />}
          />
        )}
      </Flex>
      <Text noOfLines={2} size="md">
        {comment.body}
      </Text>
    </Box>
  );
};

export default SingleComment;
