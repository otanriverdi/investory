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
  getInstruments: Array<Instrument>;
  getInstrumentById: Instrument;
  getInstrumentBySymbol: Instrument;
  getInstrumentHistory?: Maybe<Array<InstrumentHistory>>;
  getPositions: Array<Position>;
};

export type QueryGetInstrumentsArgs = {
  sortDirection?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Scalars['String']>;
  query?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Float']>;
  limit?: Maybe<Scalars['Float']>;
};

export type QueryGetInstrumentByIdArgs = {
  id: Scalars['Float'];
};

export type QueryGetInstrumentBySymbolArgs = {
  symbol: Scalars['String'];
};

export type QueryGetInstrumentHistoryArgs = {
  duration?: Maybe<Scalars['String']>;
  symbol: Scalars['String'];
};

export type QueryGetPositionsArgs = {
  sortDirection?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Scalars['String']>;
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
  createPosition: Position;
  updatePosition: Position;
  closePosition: ClosePrice;
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

export type DeletePositionMutationVariables = Exact<{
  id: Scalars['Float'];
}>;

export type DeletePositionMutation = {__typename?: 'Mutation'} & {
  updatePosition: {__typename?: 'Position'} & Pick<Position, 'state'>;
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
