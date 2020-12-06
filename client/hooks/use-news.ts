import {useGetNewsForSymbolQuery} from '../graphql/generated/graphql';

export default function useNews(
  symbols: string[],
  last: number,
): {
  data: any;
  loading: boolean;
} | null {
  const {data, loading, error} = useGetNewsForSymbolQuery({
    variables: {
      symbols,
      last,
    },
  });
  if (error) {
    console.warn('Error fetching news items');
  }
  return {data: data?.getNewsForSymbol, loading};
}
