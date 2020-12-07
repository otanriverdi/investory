import {useAuth0} from '@auth0/auth0-react';
import {DeleteIcon} from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  IconButton,
  Input,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, {FormEvent, useRef} from 'react';
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from '../graphql/generated/graphql';

dayjs.extend(relativeTime);

type Props = {
  symbol: string;
};

const Comments: React.FC<Props> = ({symbol}) => {
  const {isAuthenticated, isLoading, user} = useAuth0();
  const {loading, data, refetch} = useGetCommentsQuery({variables: {symbol}});
  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const input = useRef(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    await createComment({
      variables: {symbol, body: input.current.value},
    });

    await refetch();

    input.current.value = '';
  }

  async function onDelete(id: number) {
    await deleteComment({variables: {id}});

    await refetch();
  }

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Discussion
      </Heading>
      <form onSubmit={onSubmit}>
        <FormControl id="email">
          <Input
            ref={input}
            type="text"
            disabled={!isAuthenticated || isLoading}
            placeholder="Comment on this instrument."
            autoComplete="off"
          />
          <FormHelperText>
            {isAuthenticated
              ? 'Your information will be visible.'
              : 'You need to be logged in to be able to comment.'}
          </FormHelperText>
        </FormControl>
      </form>
      <Skeleton isLoaded={!loading}>
        {data &&
          data.getComments.map(comment => (
            <Box
              _hover={{borderColor: 'cyan.300'}}
              mt={4}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              key={comment.id}
            >
              <Flex align="center" mb={2}>
                <Avatar
                  mr={2}
                  size="sm"
                  src={user.picture}
                  bgColor="gray.300"
                  name={user.name}
                />
                <Box>
                  <Heading fontWeight="400" size="sm">
                    {user.name}
                  </Heading>
                  <Text color="gray.500" size="xs">
                    {dayjs(comment.createdAt).fromNow()}
                  </Text>
                </Box>
                {comment.owner === user.sub && (
                  <IconButton
                    onClick={() => onDelete(comment.id)}
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
          ))}
        {data && !data.getComments.length && (
          <Text mt={2}>No comments yet!</Text>
        )}
      </Skeleton>
    </Box>
  );
};

export default Comments;
