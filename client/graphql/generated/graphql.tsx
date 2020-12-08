import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]: Maybe<T[SubKey]>};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  /** Get all comments made on the provided symbol. */
  getComments: Array<Comment>;
  getInstruments: Array<Instrument>;
  getInstrumentBySymbol: Instrument;
  getInstrumentHistory?: Maybe<Array<InstrumentHistory>>;
  getNewsForSymbol: Array<NewsItem>;
  getPositions: Array<Position>;
};

export type QueryGetCommentsArgs = {
  symbol: Scalars['String'];
};

export type QueryGetInstrumentsArgs = {
  sortDirection?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Scalars['String']>;
  query?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Float']>;
  limit?: Maybe<Scalars['Float']>;
};

export type QueryGetInstrumentBySymbolArgs = {
  symbol: Scalars['String'];
};

export type QueryGetInstrumentHistoryArgs = {
  duration?: Maybe<Scalars['String']>;
  symbol: Scalars['String'];
};

export type QueryGetNewsForSymbolArgs = {
  last?: Maybe<Scalars['Float']>;
  symbols: Array<Scalars['String']>;
};

export type QueryGetPositionsArgs = {
  sortDirection?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Float'];
  instrument: Instrument;
  owner: Scalars['String'];
  createdAt: Scalars['DateTime'];
  body: Scalars['String'];
  username: Scalars['String'];
  image: Scalars['String'];
};

export type Instrument = {
  __typename?: 'Instrument';
  id: Scalars['Int'];
  symbol: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  price?: Maybe<Price>;
};

export type Price = {
  __typename?: 'Price';
  current: Scalars['Float'];
  previous: Scalars['Float'];
};

export type InstrumentHistory = {
  __typename?: 'InstrumentHistory';
  close: Scalars['Float'];
  high: Scalars['Float'];
  low: Scalars['Float'];
  open: Scalars['Float'];
  volume: Scalars['Float'];
  date: Scalars['DateTime'];
};

export type NewsItem = {
  __typename?: 'NewsItem';
  datetime: Scalars['Float'];
  headline: Scalars['String'];
  source: Scalars['String'];
  url: Scalars['String'];
  summary: Scalars['String'];
  image: Scalars['String'];
};

export type Position = {
  __typename?: 'Position';
  id: Scalars['Float'];
  amount: Scalars['Float'];
  price: Scalars['Float'];
  currency: Scalars['String'];
  commission: Scalars['Float'];
  state: PositionState;
  date: Scalars['DateTime'];
  type: PositionType;
  instrument: Instrument;
  closePrice?: Maybe<ClosePrice>;
};

export enum PositionState {
  Open = 'OPEN',
  Closed = 'CLOSED',
  Deleted = 'DELETED',
}

export enum PositionType {
  Sell = 'SELL',
  Buy = 'BUY',
}

export type ClosePrice = {
  __typename?: 'ClosePrice';
  price: Scalars['Float'];
  closedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  deleteComment: Scalars['Boolean'];
  createPosition: Position;
  updatePosition: Position;
  closePosition: ClosePrice;
};

export type MutationCreateCommentArgs = {
  symbol: Scalars['String'];
  fields: CreateCommentInput;
};

export type MutationDeleteCommentArgs = {
  id: Scalars['Float'];
};

export type MutationCreatePositionArgs = {
  fields: CreatePositionInput;
};

export type MutationUpdatePositionArgs = {
  updates: UpdatePositionInput;
  id: Scalars['Float'];
};

export type MutationClosePositionArgs = {
  id: Scalars['Float'];
};

export type CreateCommentInput = {
  body: Scalars['String'];
  username: Scalars['String'];
  image: Scalars['String'];
};

export type CreatePositionInput = {
  amount: Scalars['Float'];
  price: Scalars['Float'];
  currency?: Maybe<Scalars['String']>;
  commission?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['DateTime']>;
  symbol: Scalars['String'];
  type?: Maybe<PositionType>;
};

export type UpdatePositionInput = {
  amount?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['DateTime']>;
  type?: Maybe<PositionType>;
  state?: Maybe<PositionState>;
};

export type ClosePositionMutationVariables = Exact<{
  id: Scalars['Float'];
}>;

export type ClosePositionMutation = {__typename?: 'Mutation'} & {
  closePosition: {__typename?: 'ClosePrice'} & Pick<ClosePrice, 'price'>;
};

export type CreateCommentMutationVariables = Exact<{
  body: Scalars['String'];
  symbol: Scalars['String'];
  username: Scalars['String'];
  image: Scalars['String'];
}>;

export type CreateCommentMutation = {__typename?: 'Mutation'} & {
  createComment: {__typename?: 'Comment'} & Pick<Comment, 'id'>;
};

export type CreatePositionMutationVariables = Exact<{
  fields: CreatePositionInput;
}>;

export type CreatePositionMutation = {__typename?: 'Mutation'} & {
  createPosition: {__typename?: 'Position'} & Pick<Position, 'amount'>;
};

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Float'];
}>;

export type DeleteCommentMutation = {__typename?: 'Mutation'} & Pick<
  Mutation,
  'deleteComment'
>;

export type DeletePositionMutationVariables = Exact<{
  id: Scalars['Float'];
}>;

export type DeletePositionMutation = {__typename?: 'Mutation'} & {
  updatePosition: {__typename?: 'Position'} & Pick<Position, 'state'>;
};

export type GetCommentsQueryVariables = Exact<{
  symbol: Scalars['String'];
}>;

export type GetCommentsQuery = {__typename?: 'Query'} & {
  getComments: Array<
    {__typename?: 'Comment'} & Pick<
      Comment,
      'createdAt' | 'owner' | 'body' | 'id' | 'image' | 'username'
    >
  >;
};

export type GetInstrumentsQueryVariables = Exact<{
  query?: Maybe<Scalars['String']>;
}>;

export type GetInstrumentsQuery = {__typename?: 'Query'} & {
  getInstruments: Array<
    {__typename?: 'Instrument'} & Pick<
      Instrument,
      'id' | 'symbol' | 'name' | 'type'
    > & {
        price?: Maybe<
          {__typename?: 'Price'} & Pick<Price, 'current' | 'previous'>
        >;
      }
  >;
};

export type GetInstrumentHistoryQueryVariables = Exact<{
  symbol: Scalars['String'];
  duration?: Maybe<Scalars['String']>;
}>;

export type GetInstrumentHistoryQuery = {__typename?: 'Query'} & {
  getInstrumentHistory?: Maybe<
    Array<
      {__typename?: 'InstrumentHistory'} & Pick<
        InstrumentHistory,
        'open' | 'close' | 'high' | 'low' | 'volume' | 'date'
      >
    >
  >;
};

export type GetInstrumentBySymbolQueryVariables = Exact<{
  symbol: Scalars['String'];
}>;

export type GetInstrumentBySymbolQuery = {__typename?: 'Query'} & {
  getInstrumentBySymbol: {__typename?: 'Instrument'} & Pick<
    Instrument,
    'id' | 'symbol' | 'name' | 'type'
  > & {
      price?: Maybe<
        {__typename?: 'Price'} & Pick<Price, 'current' | 'previous'>
      >;
    };
};

export type GetNewsForSymbolQueryVariables = Exact<{
  symbols: Array<Scalars['String']>;
  last?: Maybe<Scalars['Float']>;
}>;

export type GetNewsForSymbolQuery = {__typename?: 'Query'} & {
  getNewsForSymbol: Array<
    {__typename?: 'NewsItem'} & Pick<
      NewsItem,
      'datetime' | 'headline' | 'source' | 'url' | 'summary'
    >
  >;
};

export type GetPositionsQueryVariables = Exact<{[key: string]: never}>;

export type GetPositionsQuery = {__typename?: 'Query'} & {
  getPositions: Array<
    {__typename?: 'Position'} & Pick<
      Position,
      | 'id'
      | 'amount'
      | 'price'
      | 'currency'
      | 'commission'
      | 'date'
      | 'state'
      | 'type'
    > & {
        closePrice?: Maybe<
          {__typename?: 'ClosePrice'} & Pick<ClosePrice, 'price'>
        >;
        instrument: {__typename?: 'Instrument'} & Pick<
          Instrument,
          'id' | 'symbol' | 'name' | 'type'
        > & {
            price?: Maybe<
              {__typename?: 'Price'} & Pick<Price, 'current' | 'previous'>
            >;
          };
      }
  >;
};

export const ClosePositionDocument = gql`
  mutation closePosition($id: Float!) {
    closePosition(id: $id) {
      price
    }
  }
`;
export type ClosePositionMutationFn = Apollo.MutationFunction<
  ClosePositionMutation,
  ClosePositionMutationVariables
>;

/**
 * __useClosePositionMutation__
 *
 * To run a mutation, you first call `useClosePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClosePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closePositionMutation, { data, loading, error }] = useClosePositionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useClosePositionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ClosePositionMutation,
    ClosePositionMutationVariables
  >,
) {
  return Apollo.useMutation<
    ClosePositionMutation,
    ClosePositionMutationVariables
  >(ClosePositionDocument, baseOptions);
}
export type ClosePositionMutationHookResult = ReturnType<
  typeof useClosePositionMutation
>;
export type ClosePositionMutationResult = Apollo.MutationResult<ClosePositionMutation>;
export type ClosePositionMutationOptions = Apollo.BaseMutationOptions<
  ClosePositionMutation,
  ClosePositionMutationVariables
>;
export const CreateCommentDocument = gql`
  mutation createComment(
    $body: String!
    $symbol: String!
    $username: String!
    $image: String!
  ) {
    createComment(
      fields: {body: $body, username: $username, image: $image}
      symbol: $symbol
    ) {
      id
    }
  }
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      body: // value for 'body'
 *      symbol: // value for 'symbol'
 *      username: // value for 'username'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >,
) {
  return Apollo.useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CreateCommentDocument, baseOptions);
}
export type CreateCommentMutationHookResult = ReturnType<
  typeof useCreateCommentMutation
>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export const CreatePositionDocument = gql`
  mutation createPosition($fields: CreatePositionInput!) {
    createPosition(fields: $fields) {
      amount
    }
  }
`;
export type CreatePositionMutationFn = Apollo.MutationFunction<
  CreatePositionMutation,
  CreatePositionMutationVariables
>;

/**
 * __useCreatePositionMutation__
 *
 * To run a mutation, you first call `useCreatePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPositionMutation, { data, loading, error }] = useCreatePositionMutation({
 *   variables: {
 *      fields: // value for 'fields'
 *   },
 * });
 */
export function useCreatePositionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePositionMutation,
    CreatePositionMutationVariables
  >,
) {
  return Apollo.useMutation<
    CreatePositionMutation,
    CreatePositionMutationVariables
  >(CreatePositionDocument, baseOptions);
}
export type CreatePositionMutationHookResult = ReturnType<
  typeof useCreatePositionMutation
>;
export type CreatePositionMutationResult = Apollo.MutationResult<CreatePositionMutation>;
export type CreatePositionMutationOptions = Apollo.BaseMutationOptions<
  CreatePositionMutation,
  CreatePositionMutationVariables
>;
export const DeleteCommentDocument = gql`
  mutation deleteComment($id: Float!) {
    deleteComment(id: $id)
  }
`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >,
) {
  return Apollo.useMutation<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >(DeleteCommentDocument, baseOptions);
}
export type DeleteCommentMutationHookResult = ReturnType<
  typeof useDeleteCommentMutation
>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;
export const DeletePositionDocument = gql`
  mutation deletePosition($id: Float!) {
    updatePosition(updates: {state: DELETED}, id: $id) {
      state
    }
  }
`;
export type DeletePositionMutationFn = Apollo.MutationFunction<
  DeletePositionMutation,
  DeletePositionMutationVariables
>;

/**
 * __useDeletePositionMutation__
 *
 * To run a mutation, you first call `useDeletePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePositionMutation, { data, loading, error }] = useDeletePositionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePositionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePositionMutation,
    DeletePositionMutationVariables
  >,
) {
  return Apollo.useMutation<
    DeletePositionMutation,
    DeletePositionMutationVariables
  >(DeletePositionDocument, baseOptions);
}
export type DeletePositionMutationHookResult = ReturnType<
  typeof useDeletePositionMutation
>;
export type DeletePositionMutationResult = Apollo.MutationResult<DeletePositionMutation>;
export type DeletePositionMutationOptions = Apollo.BaseMutationOptions<
  DeletePositionMutation,
  DeletePositionMutationVariables
>;
export const GetCommentsDocument = gql`
  query getComments($symbol: String!) {
    getComments(symbol: $symbol) {
      createdAt
      owner
      body
      id
      image
      username
    }
  }
`;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      symbol: // value for 'symbol'
 *   },
 * });
 */
export function useGetCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCommentsQuery,
    GetCommentsQueryVariables
  >,
) {
  return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(
    GetCommentsDocument,
    baseOptions,
  );
}
export function useGetCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCommentsQuery,
    GetCommentsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(
    GetCommentsDocument,
    baseOptions,
  );
}
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<
  typeof useGetCommentsLazyQuery
>;
export type GetCommentsQueryResult = Apollo.QueryResult<
  GetCommentsQuery,
  GetCommentsQueryVariables
>;
export const GetInstrumentsDocument = gql`
  query getInstruments($query: String) {
    getInstruments(query: $query) {
      id
      symbol
      name
      type
      price {
        current
        previous
      }
    }
  }
`;

/**
 * __useGetInstrumentsQuery__
 *
 * To run a query within a React component, call `useGetInstrumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInstrumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInstrumentsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetInstrumentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetInstrumentsQuery,
    GetInstrumentsQueryVariables
  >,
) {
  return Apollo.useQuery<GetInstrumentsQuery, GetInstrumentsQueryVariables>(
    GetInstrumentsDocument,
    baseOptions,
  );
}
export function useGetInstrumentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetInstrumentsQuery,
    GetInstrumentsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetInstrumentsQuery, GetInstrumentsQueryVariables>(
    GetInstrumentsDocument,
    baseOptions,
  );
}
export type GetInstrumentsQueryHookResult = ReturnType<
  typeof useGetInstrumentsQuery
>;
export type GetInstrumentsLazyQueryHookResult = ReturnType<
  typeof useGetInstrumentsLazyQuery
>;
export type GetInstrumentsQueryResult = Apollo.QueryResult<
  GetInstrumentsQuery,
  GetInstrumentsQueryVariables
>;
export const GetInstrumentHistoryDocument = gql`
  query getInstrumentHistory($symbol: String!, $duration: String) {
    getInstrumentHistory(symbol: $symbol, duration: $duration) {
      open
      close
      high
      low
      volume
      date
    }
  }
`;

/**
 * __useGetInstrumentHistoryQuery__
 *
 * To run a query within a React component, call `useGetInstrumentHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInstrumentHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInstrumentHistoryQuery({
 *   variables: {
 *      symbol: // value for 'symbol'
 *      duration: // value for 'duration'
 *   },
 * });
 */
export function useGetInstrumentHistoryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetInstrumentHistoryQuery,
    GetInstrumentHistoryQueryVariables
  >,
) {
  return Apollo.useQuery<
    GetInstrumentHistoryQuery,
    GetInstrumentHistoryQueryVariables
  >(GetInstrumentHistoryDocument, baseOptions);
}
export function useGetInstrumentHistoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetInstrumentHistoryQuery,
    GetInstrumentHistoryQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    GetInstrumentHistoryQuery,
    GetInstrumentHistoryQueryVariables
  >(GetInstrumentHistoryDocument, baseOptions);
}
export type GetInstrumentHistoryQueryHookResult = ReturnType<
  typeof useGetInstrumentHistoryQuery
>;
export type GetInstrumentHistoryLazyQueryHookResult = ReturnType<
  typeof useGetInstrumentHistoryLazyQuery
>;
export type GetInstrumentHistoryQueryResult = Apollo.QueryResult<
  GetInstrumentHistoryQuery,
  GetInstrumentHistoryQueryVariables
>;
export const GetInstrumentBySymbolDocument = gql`
  query getInstrumentBySymbol($symbol: String!) {
    getInstrumentBySymbol(symbol: $symbol) {
      id
      symbol
      name
      type
      price {
        current
        previous
      }
    }
  }
`;

/**
 * __useGetInstrumentBySymbolQuery__
 *
 * To run a query within a React component, call `useGetInstrumentBySymbolQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInstrumentBySymbolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInstrumentBySymbolQuery({
 *   variables: {
 *      symbol: // value for 'symbol'
 *   },
 * });
 */
export function useGetInstrumentBySymbolQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetInstrumentBySymbolQuery,
    GetInstrumentBySymbolQueryVariables
  >,
) {
  return Apollo.useQuery<
    GetInstrumentBySymbolQuery,
    GetInstrumentBySymbolQueryVariables
  >(GetInstrumentBySymbolDocument, baseOptions);
}
export function useGetInstrumentBySymbolLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetInstrumentBySymbolQuery,
    GetInstrumentBySymbolQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    GetInstrumentBySymbolQuery,
    GetInstrumentBySymbolQueryVariables
  >(GetInstrumentBySymbolDocument, baseOptions);
}
export type GetInstrumentBySymbolQueryHookResult = ReturnType<
  typeof useGetInstrumentBySymbolQuery
>;
export type GetInstrumentBySymbolLazyQueryHookResult = ReturnType<
  typeof useGetInstrumentBySymbolLazyQuery
>;
export type GetInstrumentBySymbolQueryResult = Apollo.QueryResult<
  GetInstrumentBySymbolQuery,
  GetInstrumentBySymbolQueryVariables
>;
export const GetNewsForSymbolDocument = gql`
  query getNewsForSymbol($symbols: [String!]!, $last: Float) {
    getNewsForSymbol(symbols: $symbols, last: $last) {
      datetime
      headline
      source
      url
      summary
      source
    }
  }
`;

/**
 * __useGetNewsForSymbolQuery__
 *
 * To run a query within a React component, call `useGetNewsForSymbolQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNewsForSymbolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewsForSymbolQuery({
 *   variables: {
 *      symbols: // value for 'symbols'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useGetNewsForSymbolQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetNewsForSymbolQuery,
    GetNewsForSymbolQueryVariables
  >,
) {
  return Apollo.useQuery<GetNewsForSymbolQuery, GetNewsForSymbolQueryVariables>(
    GetNewsForSymbolDocument,
    baseOptions,
  );
}
export function useGetNewsForSymbolLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetNewsForSymbolQuery,
    GetNewsForSymbolQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    GetNewsForSymbolQuery,
    GetNewsForSymbolQueryVariables
  >(GetNewsForSymbolDocument, baseOptions);
}
export type GetNewsForSymbolQueryHookResult = ReturnType<
  typeof useGetNewsForSymbolQuery
>;
export type GetNewsForSymbolLazyQueryHookResult = ReturnType<
  typeof useGetNewsForSymbolLazyQuery
>;
export type GetNewsForSymbolQueryResult = Apollo.QueryResult<
  GetNewsForSymbolQuery,
  GetNewsForSymbolQueryVariables
>;
export const GetPositionsDocument = gql`
  query getPositions {
    getPositions {
      id
      amount
      price
      currency
      commission
      date
      state
      type
      closePrice {
        price
      }
      instrument {
        id
        symbol
        name
        type
        price {
          current
          previous
        }
      }
    }
  }
`;

/**
 * __useGetPositionsQuery__
 *
 * To run a query within a React component, call `useGetPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPositionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPositionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetPositionsQuery,
    GetPositionsQueryVariables
  >,
) {
  return Apollo.useQuery<GetPositionsQuery, GetPositionsQueryVariables>(
    GetPositionsDocument,
    baseOptions,
  );
}
export function useGetPositionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPositionsQuery,
    GetPositionsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetPositionsQuery, GetPositionsQueryVariables>(
    GetPositionsDocument,
    baseOptions,
  );
}
export type GetPositionsQueryHookResult = ReturnType<
  typeof useGetPositionsQuery
>;
export type GetPositionsLazyQueryHookResult = ReturnType<
  typeof useGetPositionsLazyQuery
>;
export type GetPositionsQueryResult = Apollo.QueryResult<
  GetPositionsQuery,
  GetPositionsQueryVariables
>;
