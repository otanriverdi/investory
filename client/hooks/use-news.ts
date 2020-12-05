import {useGetNewsForSymbolQuery} from '../graphql/generated/graphql';

export default function useNews(
  symbols: string[],
  last: number,
): {
  data: any;
  loading: boolean;
} | null {
  // useMemo(() => {
  symbols = symbols || ['AAPL', 'TWTR', 'ROCK'];
  last = last || 2;
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
