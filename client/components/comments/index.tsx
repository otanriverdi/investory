import {useAuth0} from '@auth0/auth0-react';
import {
  Box,
  FormControl,
  FormHelperText,
  Heading,
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
} from '../../graphql/generated/graphql';
import SingleComment from './comment';

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
      variables: {
        symbol,
        body: input.current.value,
        username: user.name,
        image: user.picture,
      },
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
        {data && data.getComments.length ? (
          data.getComments.map(comment => (
            <SingleComment
              currentUser={user.sub}
              key={comment.id}
              comment={comment}
              onDelete={() => onDelete(comment.id)}
            />
          ))
        ) : (
          <Text mt={2}>No comments yet!</Text>
        )}
      </Skeleton>
    </Box>
  );
};

export default Comments;
