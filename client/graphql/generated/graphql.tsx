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
  getInstrumentById?: Maybe<Instrument>;
  getInstrumentBySymbol?: Maybe<Instrument>;
  getPositions: Array<Position>;
};

export type QueryGetInstrumentsArgs = {
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

export type Mutation = {
  __typename?: 'Mutation';
  createPosition: Position;
  updatePosition: Position;
};

export type MutationCreatePositionArgs = {
  fields: CreatePositionInput;
};

export type MutationUpdatePositionArgs = {
  updates: UpdatePositionInput;
  id: Scalars['Float'];
};

export type CreatePositionInput = {
  amount: Scalars['Float'];
  price: Scalars['Float'];
  currency?: Maybe<Scalars['String']>;
  commission?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['DateTime']>;
  instrumentId: Scalars['Float'];
  type?: Maybe<PositionType>;
  state?: Maybe<PositionState>;
};

export type UpdatePositionInput = {
  amount?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['DateTime']>;
  type?: Maybe<PositionType>;
  state?: Maybe<PositionState>;
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
